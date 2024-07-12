"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useReducer } from "react";
import LogoutButton from "./logout-button";

interface UserMenuProps {
	avatar?: string;
	username: string;
	email: string;
	joinedAt: Date;
}

const UserMenu = ({ avatar, username, email, joinedAt }: UserMenuProps) => {
	const [isProfileOpen, profileOpenToggle] = useReducer(
		(state) => !state,
		false,
	);
	const [isLogoutOpen, LogoutOpenToggle] = useReducer((state) => !state, false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="size-8">
						<AvatarImage
							src={avatar ?? "https://github.com/shadcn.png"}
							alt={`${username} avatar`}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="min-w-[142px] w-fit">
					<DropdownMenuItem>
						<div className="space-y-0.5">
							<h1 className="font-semibold tracking-wide truncate text-sm">
								{username}
							</h1>
							<p className="text-muted-foreground font-medium text-xs">
								{email}
							</p>
						</div>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => profileOpenToggle()}>
						<UserIcon className="size-4 mr-2" />
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => LogoutOpenToggle()}>
						<LogOutIcon className="size-4 mr-2" />
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={isProfileOpen} onOpenChange={() => profileOpenToggle()}>
				<DialogContent hideCloseButton>
					<div className="space-y-3.5">
						<div className="relative size-[167px] mx-auto flex">
							<Image
								fill
								src={avatar ?? "https://github.com/shadcn.png"}
								alt={`${username} profile`}
								className="object-cover rounded-full"
							/>
						</div>
						<div className="text-center">
							<h1 className="font-semibold text-lg">{username}</h1>
							<p className="text-sm text-muted-foreground">{email}</p>
						</div>
					</div>

					<div className="mt-12 mb-4 flex justify-end">
						<p className="text-xs text-muted-foreground">
							Joined:{" "}
							<span className="font-bold">{joinedAt.toDateString()}</span>
						</p>
					</div>

					<DialogFooter className="grid grid-cols-1">
						<DialogClose asChild>
							<Button type="button">Close</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AlertDialog open={isLogoutOpen} onOpenChange={() => LogoutOpenToggle()}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction asChild>
							<LogoutButton />
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default UserMenu;
