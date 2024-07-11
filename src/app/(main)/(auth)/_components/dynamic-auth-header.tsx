"use client";

import { usePathname } from "next/navigation";
const DynamicAuthHeader = () => {
	const pathname = usePathname();
	const isSignUpPage = pathname === "/join";

	return (
		<div>
			<h1 className="text-2xl font-semibold">
				{isSignUpPage ? "Sign up" : "Sign in"}
			</h1>
			<p className="text-muted-foreground text-sm">
				{isSignUpPage
					? "Create a new account to start using our service."
					: "Sign in to your account to continue."}
			</p>
		</div>
	);
};

export default DynamicAuthHeader;
