import Container from "@/components/container";
import MdiGithub from "@/components/icons/MdiGithub";
import { Button, buttonVariants } from "@/components/ui/button";
import { lucia, validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { SunIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import UserMenu from "./user-menu";

const Navbar = async () => {
	const { user, session } = await validateRequest();

	return (
		<nav className="py-5 sticky top-0 bg-background z-10">
			<Container className="flex justify-between items-center">
				<div>
					<Link href="/" className="font-extrabold text-2xl">
						Image<span className="text-sky-600">ine</span>
					</Link>
				</div>
				<div className="flex space-x-5 items-center">
					<Button variant="ghost" size="sm" className="h-4 px-0 rounded-2xl">
						<SunIcon className="size-4" />
						<span className="sr-only">theme switcher</span>
					</Button>
					<Button variant="ghost" size="sm" className="h-4 px-0 rounded-2xl">
						<MdiGithub className="size-5" />
						<span className="sr-only">github repository</span>
					</Button>

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
									className: "h-8 text-xs rounded-2xl",
								}),
							)}
						>
							Sign in
						</Link>
					)}
				</div>
			</Container>
		</nav>
	);
};

export default Navbar;
