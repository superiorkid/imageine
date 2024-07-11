"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthButtomNavigation = () => {
	const pathname = usePathname();
	const isSignUpPage = pathname === "/join";

	return (
		<div>
			<p className="text-sm">
				{isSignUpPage ? (
					<>
						have an account?{" "}
						<Link href="/sign-in" className="underline font-medium">
							Sign in
						</Link>
					</>
				) : (
					<>
						dont have an account?{" "}
						<Link href="/join" className="underline font-medium">
							Create account
						</Link>
					</>
				)}
			</p>
		</div>
	);
};

export default AuthButtomNavigation;
