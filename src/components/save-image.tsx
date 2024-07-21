"use client";

import { getUserCollectionImagesAction } from "@/actions/image-action";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/session-provider";
import { useQuery } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import { useMemo } from "react";
import type { Full } from "unsplash-js/dist/methods/photos/types";
import { Button } from "./ui/button";

interface SaveImageProps {
	image: Full;
}

const SaveImage = ({ image }: SaveImageProps) => {
	const { user } = useSession();

	const { data: collectionImages, isPending } = useQuery({
		queryKey: ["collectionImages"],
		queryFn: async () => {
			const collectionImages = await getUserCollectionImagesAction(
				user?.id as string,
			);
			return collectionImages;
		},
		refetchOnMount: false,
	});

	const savedImagesFromCollections = useMemo(() => {
		return collectionImages?.find(
			(img) => img?.images?.unsplashId === image?.id,
		);
	}, [collectionImages, image]);

	return (
		<Button
			disabled
			variant="ghost"
			size="sm"
			title="Save image"
			className="rounded-none"
		>
			<StarIcon
				className={cn(
					"size-5 mr-2",
					savedImagesFromCollections && "fill-yellow-500 stroke-yellow-500",
				)}
			/>
			{savedImagesFromCollections ? "Saved" : "Save"}
		</Button>
	);
};

export default SaveImage;
