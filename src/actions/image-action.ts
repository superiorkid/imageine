"use server";

import { getImages, getUserCollectionImages } from "@/queries/image-query";

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

export const getUserCollectionImagesAction = async (userId: string) => {
	const images = await getUserCollectionImages(userId);
	return images;
};
