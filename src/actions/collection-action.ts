"use server";

import db from "@/db";
import { collection } from "@/db/schema";
import { validateRequest } from "@/lib/auth";
import { createCollectionSchema } from "@/lib/validation/create-collection-schema";
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
