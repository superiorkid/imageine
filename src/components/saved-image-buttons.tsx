import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, PlusIcon, StarIcon } from "lucide-react";
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
	return (
		<div className="border rounded-lg overflow-hidden">
			<Button
				variant="ghost"
				size="sm"
				title="Save image"
				className="rounded-none"
			>
				<StarIcon className="size-5 mr-2" />
				Save
			</Button>

			<Dialog>
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
						<DropdownMenuItem>Lombok</DropdownMenuItem>
						<DropdownMenuItem>Nature</DropdownMenuItem>
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
						<CreateCollectionForm />
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SavedImageButtons;
