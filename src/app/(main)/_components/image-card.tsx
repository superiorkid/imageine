import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import type { Nullable } from "unsplash-js/dist/helpers/typescript";

interface ImageCardProps extends React.ComponentPropsWithoutRef<"div"> {
	alt: Nullable<string>;
	src: string;
	blurDataURL: string;
	imageTitle: Nullable<string>;
	authorName: string;
	authorProfileImage: string;
}

const ImageCard = ({
	alt,
	src,
	blurDataURL,
	authorProfileImage,
	imageTitle,
	authorName,
	className,
	...restProps
}: ImageCardProps) => {
	return (
		<div
			className={cn(
				"relative w-full h-[330px] rounded-xl overflow-hidden group hover:cursor-pointer",
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

			<div className="absolute top-3 right-3">
				<Button size="icon" variant="ghost" className="rounded-lg size-5">
					<BookmarkIcon className="size-5 stroke-neutral-600" />
					<span className="sr-only">Save to albums</span>
				</Button>
			</div>

			<div className="absolute bottom-0 left-0 backdrop-blur-lg px-2 py-2.5 shadow-lg font-medium rounded-r-md hidden group-hover:block transition-all duration-300 w-full">
				<div className="flex gap-1.5 items-center">
					<Avatar className="size-6">
						<AvatarImage
							src={authorProfileImage}
							alt={`${authorProfileImage} profile picture`}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<span className="text-xs tracking-wide font-medium text-slate-200">
						{imageTitle}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ImageCard;
