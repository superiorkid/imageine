import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type { Nullable } from "unsplash-js/dist/helpers/typescript";

interface ImageCardProps extends React.ComponentPropsWithoutRef<"a"> {
	alt: Nullable<string>;
	src: string;
	blurDataURL?: string;
	imageTitle: Nullable<string>;
	authorName: string;
	authorProfileImage: string;
	id: string;
}

const ImageCard = ({
	alt,
	src,
	blurDataURL,
	authorProfileImage,
	imageTitle,
	authorName,
	className,
	id,
	...restProps
}: ImageCardProps) => {
	return (
		<Link
			href={`/images/${id}`}
			className={cn(
				"relative aspect-square rounded-lg overflow-hidden group hover:cursor-pointer",
				className,
			)}
			{...restProps}
		>
			<Image
				fill
				src={src}
				alt={alt ?? "image alternative"}
				className="object-cover group-hover:scale-110 group-hover:brightness-75 transition-all duration-300"
				loading="lazy"
				placeholder="blur"
				blurDataURL={blurDataURL}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>

			<div className="absolute top-0 left-0 backdrop-blur-lg px-2 py-4 shadow-lg font-medium rounded-r-md hidden group-hover:block transition-all duration-300 w-full">
				<div className="flex items-center">
					<div className="flex gap-2 items-center">
						<Avatar className="size-6">
							<AvatarImage
								src={authorProfileImage}
								alt={`${authorProfileImage} profile picture`}
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<span className="text-xs tracking-wide font-medium text-slate-200">
							{authorName}
						</span>
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 backdrop-blur-lg px-2 py-4 shadow-lg font-medium rounded-r-md hidden group-hover:block transition-all duration-300 w-full">
				<div className="flex gap-1.5 items-center">
					<span className="text-xs tracking-wide font-medium text-slate-200">
						{imageTitle}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default ImageCard;
