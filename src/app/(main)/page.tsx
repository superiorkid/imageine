import { env } from "@/env";
import getBase64 from "@/lib/get-base64";
import type { ImageWithBlurDataUrl } from "@/types/TImage";
import type { Basic } from "unsplash-js/dist/methods/photos/types";
import Hero from "./_components/hero";
import Images from "./_components/images";

interface HomePageProps {
	searchParams: {
		page: string;
	};
}

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

export default async function HomePage({ searchParams }: HomePageProps) {
	const images = await getImages();

	return (
		<main>
			<section>
				<Hero />
			</section>

			<section className="min-h-screen my-12">
				<Images initialValue={images} page={Number(searchParams.page)} />
			</section>
		</main>
	);
}
