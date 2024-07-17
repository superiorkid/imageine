"use client";

import { saveImagesAction } from "@/actions/image-action";
import { useSession } from "@/providers/session-provider";
import { useMutation } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import type { Full } from "unsplash-js/dist/methods/photos/types";
import { Button } from "./ui/button";

interface SaveImageProps {
	image: Full;
}

const SaveImage = ({ image }: SaveImageProps) => {
	const { user } = useSession();
	const { mutate, isPending } = useMutation({
		mutationKey: ["images", user?.username],
		mutationFn: saveImagesAction,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data.message);
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
			{isPending ? (
				"Saving..."
			) : (
				<>
					<StarIcon className="size-5 mr-2" />
					Save
				</>
			)}
		</Button>
	);
};

export default SaveImage;
