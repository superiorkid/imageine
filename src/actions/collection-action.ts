"use server";

import db from "@/db";
import {
	authorImage,
	collection,
	collectionsToImages,
	image,
	position,
	usersToImages,
} from "@/db/schema";
import { validateRequest } from "@/lib/auth";
import { createCollectionSchema } from "@/lib/validation/create-collection-schema";
import type { SaveImageSchema } from "@/lib/validation/save-image-schema";
import { getCollection } from "@/queries/collection-query";
import { and, eq } from "drizzle-orm";

export const createCollection = async (formData: FormData) => {
	const { user } = await validateRequest();

	const name = formData.get("name") as string;
	const description = formData.get("description") as string;

	// validate input
	const validateInput = createCollectionSchema.safeParse({ name, description });
	if (!validateInput.success) {
		throw new Error(validateInput.error.errors.at(0)?.message);
	}

	// check if already exist
	const collectionExist = await db.query.collection.findFirst({
		where: and(
			eq(collection.name, validateInput.data.name),
			eq(collection.userId, user?.id as string),
		),
	});
	if (collectionExist) {
		throw new Error("collection already exist. try other name.");
	}

	// save to db
	try {
		await db.insert(collection).values({
			name,
			description,
			userId: user?.id as string,
		});

		return {
			message: "create collection successfully",
		};
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create collection. somethign went wrong.");
	}
};

export const getCollectionsAction = async (userId: string) => {
	const collections = await getCollection(userId);
	return collections;
};

export const addImageToCollection = async ({
	targetCollectionId,
	unsplashId,
	userId,
	imageInput,
}: {
	targetCollectionId: number;
	unsplashId: string;
	userId: string;
	imageInput: SaveImageSchema;
}) => {
	try {
		const alreadySavedInCollection = await db
			.select()
			.from(collectionsToImages)
			.leftJoin(image, eq(collectionsToImages.imageId, image.id))
			.where(eq(image.unsplashId, unsplashId));

		let imageId: number | null = null;

		if (alreadySavedInCollection.length) {
			imageId = alreadySavedInCollection.at(0)?.collections_to_images
				.imageId as number;
			if (
				alreadySavedInCollection.at(0)?.collections_to_images.collectionId ===
				targetCollectionId
			) {
				await db.delete(image).where(eq(image.id, imageId));
				return {
					message: "Remove image from collection successfully",
				};
				// biome-ignore lint/style/noUselessElse: <explanation>
			} else {
				await db
					.delete(collectionsToImages)
					.where(eq(collectionsToImages.imageId, imageId));
			}
		} else {
			const alreadySavedByUser = await db
				.select()
				.from(usersToImages)
				.leftJoin(image, eq(usersToImages.imageId, image.id))
				.where(
					and(
						eq(image.unsplashId, unsplashId),
						eq(usersToImages.userId, userId),
					),
				);

			if (alreadySavedByUser.length) {
				imageId = alreadySavedByUser.at(0)?.users_to_images.imageId as number;
				await db
					.delete(usersToImages)
					.where(
						and(
							eq(usersToImages.imageId, imageId),
							eq(usersToImages.userId, userId),
						),
					);
			} else {
				const imageRecord = await db.query.image.findFirst({
					where: eq(image.unsplashId, unsplashId),
				});

				if (imageRecord) {
					imageId = imageRecord.id;
				} else {
					// Insert new image into the image table if not found
					const newImage = await db
						.insert(image)
						.values({
							unsplashId: unsplashId,
							url: imageInput.url,
							altDescription: imageInput.altDescription as string,
							description: imageInput.description as string,
							blurHash: imageInput.blurHash as string,
							uploadedAt: new Date(imageInput.uploadedAt),
						})
						.returning({ insertedId: image.id });

					await db.transaction(async (trx) => {
						await trx.insert(position).values({
							name: imageInput.position.name,
							latitude: imageInput.position.latitude,
							longtitude: imageInput.position.longtitude,
							imageId: newImage.at(0)?.insertedId as number,
						});
						await trx.insert(authorImage).values({
							name: imageInput.author.name,
							profileImage: imageInput.author.avatar,
							imageId: newImage.at(0)?.insertedId,
						});
					});
					imageId = newImage.at(0)?.insertedId as number;
				}
			}
		}

		if (imageId !== null) {
			await db.insert(collectionsToImages).values({
				collectionId: targetCollectionId,
				imageId: imageId,
			});
		} else {
			throw new Error("Failed to determine image ID.");
		}
		return { message: "Image added to the collection successfully" };
	} catch (error) {
		console.error(error);
		throw new Error(
			`Failed to add image to collection ${(error as Error).message}`,
		);
	}
};
