import Container from "@/components/container";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import type React from "react";
import AuthButtomNavigation from "./_components/auth-bottom-navigation";
import DynamicAuthHeader from "./_components/dynamic-auth-header";
import SocialLoginButton from "./_components/social-login-button";

interface AuthLayoutProps {
	children: Readonly<React.ReactNode>;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
	const { user } = await validateRequest();

	if (user) {
		redirect("/");
	}

	return (
		<main className="mt-16">
			<Container className="">
				<div className="flex flex-col min-h-[50dvh] items-center justify-center gap-3">
					<div className="w-[379px] space-y-8">
						<DynamicAuthHeader />

						<div className="grid grid-cols-2 gap-2">
							<SocialLoginButton
								href="/api/login/google"
								label="Google"
								size="sm"
								variant="outline"
							/>
							<SocialLoginButton
								href="/api/login/github"
								label="Github"
								size="sm"
							/>
						</div>

						<div className="flex items-center">
							<span className="flex-1  border-b border-zinc-500" />
							<span className="flex-none px-2 text-sm">Or continue with</span>
							<span className="flex-1  border-b border-zinc-500" />
						</div>

						<div>{children}</div>
					</div>

					<AuthButtomNavigation />
				</div>
			</Container>
		</main>
	);
};

export default AuthLayout;
