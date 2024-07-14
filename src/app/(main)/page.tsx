import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { getImages } from "@/queries/image-query";
import { CircleXIcon } from "lucide-react";
import Hero from "./_components/hero";
import Images from "./_components/images";

interface HomePageProps {
	searchParams: {
		page: string;
	};
}

export default async function HomePage({ searchParams }: HomePageProps) {
	const images = await getImages({});

	return (
		<>
			<section>
				<Hero />
			</section>

			<section className="min-h-screen mt-12 space-y-4">
				<Images initialValue={images.data} page={Number(searchParams.page)} />
			</section>
		</>
	);
}
