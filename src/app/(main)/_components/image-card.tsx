import Image from "next/image";
import type { Nullable } from "unsplash-js/dist/helpers/typescript";

interface ImageCardProps {
	alt: Nullable<string>;
	src: string;
	blurDataURL: string;
}

const ImageCard = ({ alt, src, blurDataURL }: ImageCardProps) => {
	return (
		<div className="relative aspect-square rounded-xl overflow-hidden group">
			<Image
				fill
				src={src}
				alt={alt ?? "image alternative"}
				className="object-cover group-hover:scale-110"
				loading="lazy"
				placeholder="blur"
				blurDataURL={blurDataURL}
			/>
		</div>
	);
};

export default ImageCard;
