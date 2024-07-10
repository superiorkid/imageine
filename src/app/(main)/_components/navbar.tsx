import Container from "@/components/container";
import MdiGithub from "@/components/icons/MdiGithub";
import { Button } from "@/components/ui/button";
import { SunIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
	return (
		<nav className="py-5">
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
					<Button size="sm" className="h-8 text-xs rounded-2xl">
						Sign in
					</Button>
				</div>
			</Container>
		</nav>
	);
};

export default Navbar;
