"use client";

import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="space-y-3.5">
				<div className="text-center text-muted-foreground">
					<h1 className="text-2xl font-semibold">500!</h1>
					<p>something went wrong. Try again later.</p>
				</div>
				<div className="flex justify-center">
					<Button size="sm" variant="secondary" onClick={() => reset()}>
						<RotateCcwIcon className="size-4 mr-2" />
						Try again
					</Button>
				</div>
			</div>
		</div>
	);
}
