"use server";

import type { SaveImageSchema } from "@/lib/validation/save-image-schema";
import { getImages } from "@/queries/image-query";

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

export const saveImages = async (values: SaveImageSchema) => {
	// validate user input
};
