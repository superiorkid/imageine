import { env } from "@/env";
import { github } from "@/lib/auth";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	const state = generateState();

	const url = await github.createAuthorizationURL(state, {
		scopes: ["read:user", "user:email"],
	});
	url.searchParams.set("prompt", "consent");

	cookies().set("oauth_state", state, {
		path: "/",
		secure: env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	return Response.redirect(url);
}
