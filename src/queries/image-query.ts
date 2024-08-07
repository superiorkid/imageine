import db from "@/db";
import { collection, collectionsToImages, image, userTable } from "@/db/schema";
import { env } from "@/env";
import { eq } from "drizzle-orm";
import ky from "ky";
import type { Full } from "unsplash-js/dist/methods/photos/types";

interface GetImagesProps {
	page?: number;
	itemPerPage?: number;
	orderBy?: "relevant" | "latest";
	keyword: string;
}

export async function getImages({
	itemPerPage = 12,
	orderBy = "relevant",
	page = 1,
	keyword,
}: GetImagesProps): Promise<{
	nextPage: number | undefined;
	data: Full[];
}> {
	const { results, total_pages } = await ky
		.get(
			`${env.UNSPLASH_URL}/search/photos?query=${keyword}&page=${page}&per_page=${itemPerPage}&order_by=${orderBy}&client_id=${env.UNSPLASH_ACCESS_KEY}`,
		)
		.json<{ total: number; total_pages: number; results: Full[] }>();

	const nextPage = page < total_pages ? page + 1 : undefined;

	return {
		nextPage,
		data: results,
	};
}

export const getImage = async (id: string): Promise<Full> => {
	const image = await ky
		.get(
			`${env.UNSPLASH_URL}/photos/${id}?client_id=${env.UNSPLASH_ACCESS_KEY}`,
		)
		.json<Full>();

	return image;
};

export const getUserCollectionImages = async (userId: string) => {
	const collectionImages = await db
		.select()
		.from(collectionsToImages)
		.leftJoin(collection, eq(collectionsToImages.collectionId, collection.id))
		.leftJoin(image, eq(collectionsToImages.imageId, image.id))
		.where(eq(collection.userId, userId));

	return collectionImages;
};
