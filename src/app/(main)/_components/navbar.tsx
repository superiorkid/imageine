import Container from "@/components/container";
import MdiGithub from "@/components/icons/MdiGithub";
import { Button, buttonVariants } from "@/components/ui/button";
import { lucia, validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { SunIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Navbar = async () => {
	const { user } = await validateRequest();

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

					{user ? (
						<form action={logoutAction}>
							<Button
								type="submit"
								size="sm"
								className="h-8 text-xs rounded-2xl"
								variant="destructive"
							>
								Log out
							</Button>
						</form>
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

async function logoutAction(): Promise<{ error: string }> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized",
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);

	return redirect("/");
}

export default Navbar;
