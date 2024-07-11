"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
interface SocialLoginButtonProps {
	href: string;
	label: string;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
}

const SocialLoginButton = ({
	href,
	label,
	size = "default",
	variant = "default",
}: SocialLoginButtonProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handlePush = () => {
		startTransition(() => {
			router.push(href);
		});
	};

	return (
		<Button
			size={size}
			variant={variant}
			onClick={handlePush}
			disabled={isPending}
		>
			{isPending ? (
				<>
					<Loader2 className="size-4 animate-spin" />
				</>
			) : (
				<>{label}</>
			)}
		</Button>
	);
};

export default SocialLoginButton;
