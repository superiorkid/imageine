import { env } from "@/env";
import getBase64 from "@/lib/get-base64";
import type { ImageWithBlurDataUrl } from "@/types/TImage";
import ky from "ky";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

interface GetImagesProps {
	page?: number;
	itemPerPage?: number;
	orderBy?: "relevant" | "latest";
}

export async function getImages({
	itemPerPage = 12,
	orderBy = "relevant",
	page = 1,
}: GetImagesProps): Promise<{
	nextPage: number | undefined;
	data: ImageWithBlurDataUrl[];
}> {
	const query = "nature";
	const orientation: "portrait" | "landscape" = "portrait";

	const { results, total_pages } = await ky
		.get(
			`${env.UNSPLASH_URL}/search/photos?query=${query}&page=${page}&per_page=${itemPerPage}&order_by=${orderBy}&orientation=${orientation}&client_id=${env.UNSPLASH_ACCESS_KEY}`,
		)
		.json<{ total: number; total_pages: number; results: Basic[] }>();

	const images = await Promise.all(
		results.map(async (image) => {
			const blurDataUrl = await getBase64(image.urls.thumb);
			return { ...image, blurDataUrl };
		}),
	);

	const nextPage = page < total_pages ? page + 1 : undefined;

	return {
		nextPage,
		data: images,
	};
}
