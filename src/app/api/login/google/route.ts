import { env } from "@/env";
import { google } from "@/lib/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET() {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes: ["profile", "email"],
	});
	url.searchParams.set("access_type", "offline");
	url.searchParams.set("prompt", "consent");

	cookies().set("code_verifier", codeVerifier, {
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		sameSite: "strict",
	});

	cookies().set("oauth_state", state, {
		path: "/",
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	return Response.redirect(url);
}
