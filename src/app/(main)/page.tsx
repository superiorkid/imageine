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
		<main>
			<section>
				<Hero />
			</section>

			<section className="min-h-screen my-12 space-y-4">
				<Container>
					<Button size="sm" variant="outline" title="reset search query">
						<CircleXIcon className="size-3 mr-2" />
						Search result for <span className="text-semibold">red rose</span>
					</Button>
				</Container>

				<Images initialValue={images.data} page={Number(searchParams.page)} />
			</section>
		</main>
	);
}
