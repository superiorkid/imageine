"use server";

import { getImages } from "@/app/(main)/page";

export const getImagesAction = async (page: number) => {
	const images = await getImages(page);
	return images;
};
