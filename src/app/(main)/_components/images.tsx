"use client";

import { getImagesAction } from "@/actions/image-action";
import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import type { Full } from "unsplash-js/dist/methods/photos/types";
import ImageCard from "./image-card";

interface ImagesProps {
	initialValue: Full[];
	keyword?: string;
}

const Images = ({ initialValue, keyword }: ImagesProps) => {
	const { ref, inView } = useInView({
		threshold: 0,
	});

	const { data, fetchNextPage, isFetching, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ["images", keyword],
			queryFn: async ({ pageParam, queryKey }) => {
				const [, keyword] = queryKey;

				const images = await getImagesAction({
					page: pageParam,
					keyword: keyword as string,
				});
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
		return data?.pages.reduce<Full[]>((acc, curr) => {
			return acc.concat(curr.data);
		}, []);
	}, [data]);

	return (
		<Container>
			{/* TODO: handle data if not found */}
			<ResponsiveMasonry
				columnsCountBreakPoints={{ 640: 1, 768: 2, 1024: 3, 1280: 4 }}
			>
				<Masonry columnsCount={4} gutter="10px">
					{mergedData?.map((image, index) => (
						<ImageCard
							className={getFixedHeight(index, 0)}
							blurDataURL={`data:image/svg+xml;base64,${image.blur_hash}`}
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
