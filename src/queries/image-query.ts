import { env } from "@/env";
import getBase64 from "@/lib/get-base64";
import type { ImageWithBlurDataUrl } from "@/types/TImage";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

export async function getImages(
	page?: number,
	itemPerPage?: number,
	orderBy?: "popularity" | "latest" | "oldest",
): Promise<ImageWithBlurDataUrl[]> {
	const perPage = itemPerPage || 12;
	const currentPage = page || 1;
	const order = orderBy || "popularity";

	const res = await fetch(
		`${env.UNSPLASH_URL}/photos?page=${currentPage}&per_page=${perPage}&order_by=${order}&client_id=${env.UNSPLASH_ACCESS_KEY}`,
	);

	const results = (await res.json()) as Basic[];

	const images = await Promise.all(
		results.map(async (image) => {
			const blurDataUrl = await getBase64(image.urls.thumb);
			return { ...image, blurDataUrl };
		}),
	);

	return images;
}
