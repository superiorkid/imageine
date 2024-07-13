"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SwitchNav = () => {
	const pathname = usePathname();
	const isHomepage = pathname === "/";

	return (
		<Link
			href={isHomepage ? "/albums" : "/"}
			title={isHomepage ? "Go to albums" : "Go to homepage"}
			className={cn(
				buttonVariants({
					className:
						"fixed bottom-10 left-10 rounded-full size-14 shadow-xl z-10",
					size: "icon",
					variant: "outline",
				}),
			)}
		>
			<ArrowLeftRightIcon />
			<span className="sr-only">Switch navigation</span>
		</Link>
	);
};

export default SwitchNav;
