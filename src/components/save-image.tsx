"use client";

import {
	getUserSavedImageAction,
	saveImagesAction,
} from "@/actions/image-action";
import queryClient from "@/lib/query-client";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/session-provider";
import type { TUsersToImages } from "@/types/TUsersToImages";
import { faker } from "@faker-js/faker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateIdFromEntropySize } from "lucia";
import { StarIcon } from "lucide-react";
import type { Full } from "unsplash-js/dist/methods/photos/types";
import { Button } from "./ui/button";

interface SaveImageProps {
	image: Full;
}

const SaveImage = ({ image }: SaveImageProps) => {
	const { user } = useSession();

	const { data: images } = useQuery({
		queryKey: ["images", user?.username],
		queryFn: async () => {
			const images = await getUserSavedImageAction(user?.id as string);
			return images;
		},
		refetchOnMount: false,
	});

	const alreadySavedImage = images?.find(
		(img) => img.images?.unsplashId === image.id,
	);

	const { mutate, isPending } = useMutation({
		mutationFn: saveImagesAction,
		onMutate: async (newImage) => {
			await queryClient.cancelQueries({
				queryKey: ["images", user?.username],
			});

			const previousImage = queryClient.getQueryData([
				"images",
				user?.username,
			]) as TUsersToImages[];

			queryClient.setQueryData(
				["images", user?.username],
				(old: TUsersToImages[]) => {
					const userId = generateIdFromEntropySize(10);
					const imageId = generateIdFromEntropySize(10);

					const newImageInput = {
						users_to_images: {
							userId,
							imageId,
						},
						images: {
							id: imageId,
							unsplashId: newImage.unsplashId,
							url: newImage.url,
							description: newImage.description,
							altDescription: newImage.altDescription,
							blurHash: newImage.blurHash,
							uploadedAt: newImage.uploadedAt,
						},
						user: {
							id: userId,
							username: faker.internet.userName,
							email: faker.internet.email,
							passwordHash: null,
							profileImage: faker.image.urlPicsumPhotos,
							createdAt: faker.date.anytime,
						},
					};

					return [...(old ?? []), newImageInput];
				},
			);

			return { previousImage };
		},
		onError: (error, newImage, context) => {
			queryClient.setQueryData(
				["images", user?.username],
				context?.previousImage,
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["images", user?.username],
			});
		},
	});

	return (
		<Button
			variant="ghost"
			size="sm"
			title="Save image"
			className="rounded-none"
			disabled={isPending}
			onClick={() =>
				mutate({
					unsplashId: image.id,
					description: image.description,
					altDescription: image.alt_description,
					blurHash: image.blur_hash,
					uploadedAt: new Date(image.created_at).toISOString(),
					url: image.urls.small,
					author: {
						name: image.user.name,
						avatar: image.user.profile_image.small,
					},
					position: {
						name: image.location.name as string,
						latitude: String(image.location.position.latitude),
						longtitude: String(image.location.position.longitude),
					},
				})
			}
		>
			{/* {isPending ? (
				<Loader2 className="size-4 animate-spin" />
			) : (
				<> */}
			<StarIcon
				className={cn(
					"size-5 mr-2",
					alreadySavedImage && "fill-yellow-500 stroke-yellow-500",
				)}
			/>
			Save
			{/* </>
			)} */}
		</Button>
	);
};

export default SaveImage;
