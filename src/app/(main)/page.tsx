import { env } from "@/env";
import { getImages } from "@/queries/image-query";
import Hero from "./_components/hero";
import Images from "./_components/images";

export default async function HomePage() {
	const images = await getImages({ keyword: env.DEFAULT_SEARCH_QUERY });

	return (
		<>
			<section>
				<Hero />
			</section>

			<section className="min-h-screen mt-12 space-y-4">
				<Images initialValue={images.data} keyword={env.DEFAULT_SEARCH_QUERY} />
			</section>
		</>
	);
}
