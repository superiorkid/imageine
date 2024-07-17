import db from "@/db";
import { collection } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getCollection(userId: string) {
	try {
		const collections = await db.query.collection.findMany({
			where: eq(collection.userId, userId),
			orderBy: [desc(collection.createdAt)],
		});

		return collections;
	} catch (error) {
		console.error("failed to get collections");
	}
}
