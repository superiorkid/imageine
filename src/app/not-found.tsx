import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="space-y-3.5">
				<div className="text-center text-muted-foreground">
					<h1 className="text-2xl font-semibold">404!</h1>
					<p>This page could not be found</p>
				</div>
				<div className="flex justify-center">
					<Link
						href="/"
						className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
					>
						<ArrowLeftIcon className="size-4 mr-2" />
						Go Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
