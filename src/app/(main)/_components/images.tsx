"use client";

import { getImagesAction } from "@/actions/image-action";
import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ImageWithBlurDataUrl } from "@/types/TImage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageCard from "./image-card";

interface ImagesProps {
	initialValue: ImageWithBlurDataUrl[];
	page: number;
}

const Images = ({ initialValue, page }: ImagesProps) => {
	const { ref, inView } = useInView({
		threshold: 0,
	});

	const { data, fetchNextPage, isFetching, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ["images", page],
			queryFn: async ({ pageParam }) => {
				const images = await getImagesAction(pageParam);
				return images;
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
		});

	const heights = useMemo<string[]>(
		() => ["h-[500px]", "h-[412px]", "h-[325px]", "h-[375px]", "h-[300px]"],
		[],
	);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	const getFixedHeight = useCallback(
		(index: number, columnIndex: number) => {
			return heights[(index + columnIndex) % heights.length];
		},
		[heights],
	);

	const mergedData = useMemo(() => {
		return data?.pages.reduce<ImageWithBlurDataUrl[]>((acc, curr) => {
			return acc.concat(curr.data);
		}, []);
	}, [data]);

	return (
		<Container>
			<ResponsiveMasonry
				columnsCountBreakPoints={{ 640: 1, 768: 2, 1024: 3, 1280: 4 }}
			>
				<Masonry columnsCount={4} gutter="10px">
					{mergedData?.map((image, index) => (
						<ImageCard
							blurDataURL={image.blurDataUrl}
							className={getFixedHeight(index, 0)}
							key={image.id}
							alt={image.description}
							src={image.urls.small}
							imageTitle={image.alt_description}
							authorName={image.user.name}
							authorProfileImage={image.user.profile_image.small}
							id={image.id}
						/>
					))}

					{(isFetching || isFetchingNextPage) &&
						Array.from({ length: 8 }).map((_, index) => (
							<Skeleton
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								className={cn(getFixedHeight(index % 4, index % 4))}
							/>
						))}
				</Masonry>
			</ResponsiveMasonry>
			<div ref={ref} />
		</Container>
	);
};

export default Images;
