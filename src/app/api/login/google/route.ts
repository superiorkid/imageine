import { env } from "@/env";
import { google } from "@/lib/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { GOOGLE_SCOPES } from "../constants/scopes";

export async function GET(): Promise<Response> {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes: GOOGLE_SCOPES,
	});
	url.searchParams.set("access_type", "offline");
	url.searchParams.set("prompt", "consent");

	cookies().set("oauth_state", state, {
		path: "/",
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	cookies().set("code_verifier", codeVerifier, {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10,
		secure: env.NODE_ENV === "production",
		sameSite: "lax",
	});

	return Response.redirect(url);
}
