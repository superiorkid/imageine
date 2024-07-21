import Container from "@/components/container";
import MdiGithub from "@/components/icons/MdiGithub";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { SunIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import UserMenu from "./user-menu";

const SearchInput = dynamic(() => import("./search-input"), {
	loading: () => <Skeleton className="w-full h-11" />,
});

const Navbar = async () => {
	const { user, session } = await validateRequest();

	return (
		<>
			<Container className="flex space-x-8 items-center">
				<div>
					<Link href="/" className="font-extrabold text-3xl">
						Image<span className="text-sky-600">ine</span>
					</Link>
				</div>

				<div className="flex-1">
					<SearchInput />
				</div>

				<div className="flex space-x-5 items-center">
					<ModeToggle />
					<Link
						href="https://github.com/superiorkid/imageine"
						target="_blank"
						className={buttonVariants({
							variant: "ghost",
							size: "sm",
							className: "h-4 px-0 rounded-2xl hidden lg:flex",
						})}
					>
						<MdiGithub className="size-6" />
						<span className="sr-only">github repository</span>
					</Link>

					{session ? (
						<UserMenu
							avatar={user.profileImage}
							username={user.username}
							email={user.email}
							joinedAt={user.createdAt}
						/>
					) : (
						<Link
							href="/sign-in"
							className={cn(
								buttonVariants({
									size: "sm",
									className: "text-xs rounded-2xl px-3.5",
								}),
							)}
						>
							Sign in
						</Link>
					)}
				</div>
			</Container>
		</>
	);
};

export default Navbar;
