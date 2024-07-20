"use client";

import {
	addImageToCollection,
	getCollectionsAction,
} from "@/actions/collection-action";
import queryClient from "@/lib/query-client";
import { useSession } from "@/providers/session-provider";
import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useReducer, useState } from "react";
import { toast } from "sonner";
import type { Full } from "unsplash-js/dist/methods/photos/types";
import CreateCollectionForm from "./create-collection-form";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface SaveImageToCollectionsProps {
	image: Full;
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

// TODO: prevent dropdown close ater option was checked

const SaveImageToCollections = ({ image }: SaveImageToCollectionsProps) => {
	// state to open/close collections dialog
	const [isOpen, openToggle] = useReducer((state) => !state, false);
	const [isDropdownOpen, openDropdownToggle] = useState<boolean>(false);

	const { user } = useSession();
	const { data: collections, isPending } = useQuery({
		queryKey: ["collections", user?.username],
		queryFn: async () => {
			const data = await getCollectionsAction(user?.id as string);
			return data;
		},
		refetchOnMount: false,
	});

	const { mutate: mutateCollection } = useMutation({
		mutationFn: addImageToCollection,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data.message);
			queryClient.invalidateQueries({
				queryKey: ["collectionImages"],
			});
			queryClient.invalidateQueries({
				queryKey: ["collections", user?.username],
			});
		},
	});

	const findImageCollection = useCallback(
		(collectionId: number) => {
			return collections?.some((collection) =>
				collection.collectionsToImages.some(
					(img) =>
						img.images.unsplashId === image.id &&
						collection.id === collectionId,
				),
			);
		},
		[collections, image],
	);

	return (
		<Dialog open={isOpen} onOpenChange={openToggle}>
			<DropdownMenu open={isDropdownOpen} onOpenChange={openDropdownToggle}>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						title="Save image to collection"
						className="h-9 rounded-none"
					>
						<ChevronDownIcon className="size-5" />
						<span className="sr-only">Save image to collection</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-fit min-w-[193px]">
					<DropdownMenuLabel>Your collections</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{isPending ? (
						<DropdownMenuItem className="flex justify-center">
							<Loader2Icon className="size-4 animate-spin stroke-muted-foreground" />
						</DropdownMenuItem>
					) : !collections?.length ? (
						<DropdownMenuItem className="italic text-muted-foreground" disabled>
							No collection found.
						</DropdownMenuItem>
					) : (
						collections?.map((collection) => {
							const isChecked: Checked = findImageCollection(collection.id);

							return (
								<DropdownMenuCheckboxItem
									key={collection.id}
									className="capitalize"
									checked={isChecked}
									onCheckedChange={(checked) => {
										mutateCollection({
											targetCollectionId: collection.id,
											unsplashId: image.id,
											userId: user?.id as string,
											imageInput: {
												unsplashId: image.id,
												url: image.urls.small,
												description: image.description,
												altDescription: image.alt_description,
												blurHash: image.blur_hash,
												uploadedAt: image.created_at,
												position: {
													name: image.location.name as string,
													latitude: String(image.location.position.latitude),
													longtitude: String(image.location.position.longitude),
												},
												author: {
													name: image.user.name,
													avatar: image.user.profile_image.small,
												},
											},
										});
										openDropdownToggle(true);
									}}
								>
									{collection.name}
								</DropdownMenuCheckboxItem>
							);
						})
					)}

					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<DialogTrigger className="flex items-center">
							<PlusIcon className="size-5 mr-2" />
							Create collection
						</DialogTrigger>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DialogContent className="p-0">
				<DialogHeader className="border-b p-4">
					<DialogTitle>Create collection</DialogTitle>
				</DialogHeader>

				<div className="px-4 pb-4">
					<CreateCollectionForm dropdownToggle={openToggle} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SaveImageToCollections;
