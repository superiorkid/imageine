import db from "@/db";
import { collection, collectionsToImages, userTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { collections } from "unsplash-js/dist/internals";

export async function getCollection(userId: string) {
	try {
		const collections = await db.query.collection.findMany({
			where: eq(collection.userId, userId),
			with: { collectionsToImages: { with: { images: true } } },
			orderBy: [desc(collection.createdAt)],
		});

		return collections;
	} catch (error) {
		console.error("failed to get collections");
	}
}
