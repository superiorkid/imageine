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
import {
	type SaveImageSchema,
	saveImageSchema,
} from "@/lib/validation/save-image-schema";
import { getImages, getUserSavedImages } from "@/queries/image-query";
import { and, eq } from "drizzle-orm";

export const getImagesAction = async ({
	page,
	keyword,
}: {
	page: number;
	keyword: string;
}) => {
	const images = await getImages({
		page,
		keyword,
	});
	return images;
};

export const saveImagesAction = async (values: SaveImageSchema) => {
	const { user } = await validateRequest();
	// validate user input
	const { success, data, error } = saveImageSchema.safeParse(values);
	if (!success) {
		throw new Error(error.errors.at(0)?.message);
	}

	try {
		const imageExists = await db
			.select()
			.from(usersToImages)
			.leftJoin(image, eq(usersToImages.imageId, image.id))
			.where(
				and(
					eq(usersToImages.userId, user?.id as string),
					eq(image.unsplashId, data.unsplashId),
				),
			);

		if (imageExists.length) {
			throw new Error("Image already saved.");
		}

		const imageInUserCollections = await db
			.select()
			.from(collectionsToImages)
			.leftJoin(collection, eq(collectionsToImages.collectionId, collection.id))
			.leftJoin(image, eq(collectionsToImages.imageId, image.id))
			.where(
				and(
					eq(image.unsplashId, data.unsplashId),
					eq(collection.userId, user?.id as string),
				),
			);

		if (imageInUserCollections.length) {
			throw new Error("Image is already in one of your collections.");
		}

		const newImage = await db
			.insert(image)
			.values({
				unsplashId: data.unsplashId,
				url: data.url,
				altDescription: data.altDescription as string,
				description: data.description as string,
				blurHash: data.blurHash as string,
				uploadedAt: new Date(data.uploadedAt),
			})
			.returning({ insertedId: image.id });

		await db.transaction(async (trx) => {
			await trx.insert(position).values({
				name: data.position.name,
				latitude: data.position.latitude,
				longtitude: data.position.longtitude,
				imageId: newImage.at(0)?.insertedId as number,
			});
			await trx.insert(authorImage).values({
				name: data.author.name,
				profileImage: data.author.avatar,
				imageId: newImage.at(0)?.insertedId,
			});

			await trx.insert(usersToImages).values({
				userId: user?.id as string,
				imageId: newImage.at(0)?.insertedId as number,
			});
		});

		return {
			message: "save image successfully",
		};
	} catch (error) {
		console.error(error);
		throw new Error(
			(error as Error).message || "failed to save image.something went wrong",
		);
	}
};

export const getUserSavedImageAction = async (userId: string) => {
	const images = await getUserSavedImages(userId);
	return images;
};
