"use client";

import { getImagesAction } from "@/actions/image-action";
import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ImageWithBlurDataUrl } from "@/types/TImage";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import ImageCard from "./image-card";

interface ImagesProps {
	initialValue: ImageWithBlurDataUrl[];
	page: number;
}

const Images = ({ initialValue, page }: ImagesProps) => {
	const { data: images } = useQuery({
		queryKey: ["images"],
		queryFn: async () => {
			const images = await getImagesAction(page);
			return images;
		},
		initialData: initialValue,
		refetchOnMount: false,
	});

	const firstColumns = images.filter((_, index) => index % 4 === 0);
	const secondColumns = images.filter((_, index) => index % 4 === 1);
	const thirdColumns = images.filter((_, index) => index % 4 === 2);
	const fourthColumns = images.filter((_, index) => index % 4 === 3);

	const heights = [
		"h-[500px]",
		"h-[412px]",
		"h-[325px]",
		"h-[375px]",
		"h-[300px]",
	];

	return (
		<Container>
			<div className="grid grid-cols-4 gap-4 items-start">
				<div className="grid gap-4">
					{firstColumns.map((image) => (
						<ImageCard
							className={`${heights[Math.floor(Math.random() * heights.length)]}`}
							blurDataURL={image.blurDataUrl}
							key={image.id}
							alt={image.description}
							src={image.urls.thumb}
							imageTitle={image.alt_description}
							authorName={image.user.name}
							authorProfileImage={image.user.profile_image.small}
						/>
					))}

					{Array.from({ length: 2 }).map((_, index) => (
						<Skeleton
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className={cn(
								`${heights[Math.floor(Math.random() * heights.length)]}`,
							)}
						/>
					))}
				</div>

				<div className="grid gap-4">
					{secondColumns.map((image) => {
						return (
							<ImageCard
								className={`${heights[Math.floor(Math.random() * heights.length)]}`}
								blurDataURL={image.blurDataUrl}
								key={image.id}
								alt={image.description}
								src={image.urls.thumb}
								imageTitle={image.alt_description}
								authorName={image.user.name}
								authorProfileImage={image.user.profile_image.small}
							/>
						);
					})}
					{Array.from({ length: 2 }).map((_, index) => (
						<Skeleton
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className={cn(
								`${heights[Math.floor(Math.random() * heights.length)]}`,
							)}
						/>
					))}
				</div>

				<div className="grid gap-4">
					{thirdColumns.map((image) => {
						return (
							<ImageCard
								className={`${heights[Math.floor(Math.random() * heights.length)]}`}
								blurDataURL={image.blurDataUrl}
								key={image.id}
								alt={image.description}
								src={image.urls.thumb}
								imageTitle={image.alt_description}
								authorName={image.user.name}
								authorProfileImage={image.user.profile_image.small}
							/>
						);
					})}
					{Array.from({ length: 2 }).map((_, index) => (
						<Skeleton
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className={cn(
								`${heights[Math.floor(Math.random() * heights.length)]}`,
							)}
						/>
					))}
				</div>

				<div className="grid gap-4">
					{fourthColumns.map((image) => {
						return (
							<ImageCard
								className={`${heights[Math.floor(Math.random() * heights.length)]}`}
								blurDataURL={image.blurDataUrl}
								key={image.id}
								alt={image.description}
								src={image.urls.thumb}
								imageTitle={image.alt_description}
								authorName={image.user.name}
								authorProfileImage={image.user.profile_image.small}
							/>
						);
					})}
					{Array.from({ length: 2 }).map((_, index) => (
						<Skeleton
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className={cn(
								`${heights[Math.floor(Math.random() * heights.length)]}`,
							)}
						/>
					))}
				</div>
			</div>

			<div className="flex items-center justify-center">
				<Loader2Icon className="animate-spin size-5 mr-2" />
				loading...
			</div>
		</Container>
	);
};

export default Images;
