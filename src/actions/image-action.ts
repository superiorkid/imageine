"use server";

import { getImages } from "@/queries/image-query";

export const getImagesAction = async (page: number) => {
	const images = await getImages(page);
	return images;
};
