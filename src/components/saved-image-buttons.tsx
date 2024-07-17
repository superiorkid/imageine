"use client";

import { getCollectionsAction } from "@/actions/collection-action";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/providers/session-provider";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, Loader2Icon, PlusIcon, StarIcon } from "lucide-react";
import { useReducer } from "react";
import CreateCollectionForm from "./create-collection-form";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

const SavedImageButtons = () => {
	// state to open/close collections dialog
	const [isOpen, openToggle] = useReducer((state) => !state, false);

	const { user } = useSession();
	const { data: collections, isPending } = useQuery({
		queryKey: ["collections", user?.username],
		queryFn: async () => {
			const data = await getCollectionsAction(user?.id as string);
			return data;
		},
		refetchOnMount: false,
	});

	return (
		<div className="border flex items-center rounded-lg overflow-hidden">
			<Button
				variant="ghost"
				size="sm"
				title="Save image"
				className="rounded-none"
			>
				<StarIcon className="size-5 mr-2" />
				Save
			</Button>

			<Dialog open={isOpen} onOpenChange={openToggle}>
				<DropdownMenu>
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
							<DropdownMenuItem className="italic text-muted-foreground">
								No collectio found.
							</DropdownMenuItem>
						) : (
							collections?.map((collection) => (
								<DropdownMenuCheckboxItem
									key={collection.id}
									className="capitalize"
								>
									{collection.name}
								</DropdownMenuCheckboxItem>
							))
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
		</div>
	);
};

export default SavedImageButtons;
