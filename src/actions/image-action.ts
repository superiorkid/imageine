"use server";

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
