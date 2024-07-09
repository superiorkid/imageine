import { unsplash } from "@/lib/unsplash";
import type { Basic } from "unsplash-js/dist/methods/photos/types";
import Hero from "./_components/hero";
import Images from "./_components/images";

export default function Home() {
	return (
		<main>
			<section>
				<Hero />
			</section>

			<section className="min-h-screen my-12">
				<Images />
			</section>
		</main>
	);
}
