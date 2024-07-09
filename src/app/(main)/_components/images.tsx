import Container from "@/components/container";
import getBase64 from "@/lib/get-base64";
import { unsplash } from "@/lib/unsplash";
import type { Basic } from "unsplash-js/dist/methods/photos/types";
import ImageCard from "./image-card";

const Images = async () => {
	const results = await unsplash.photos.list({ perPage: 12, page: 1 });
	const images = results.response?.results as Basic[];

	return (
		<Container>
			<div className="grid grid-cols-4 gap-6">
				{images.map(async (image) => {
					const blurDataURL = await getBase64(image.urls.thumb);

					return (
						<ImageCard
							blurDataURL={blurDataURL}
							key={image.id}
							alt={image.description}
							src={image.urls.thumb}
						/>
					);
				})}
			</div>
		</Container>
	);
};

export default Images;
