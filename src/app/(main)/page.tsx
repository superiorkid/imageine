import { getImages } from "@/queries/image-query";
import Hero from "./_components/hero";
import Images from "./_components/images";

interface HomePageProps {
	searchParams: {
		page: string;
	};
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
