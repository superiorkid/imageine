import db from "@/db";
import { oauthAccountTable, userTable } from "@/db/schema";
import { google, lucia } from "@/lib/auth";
import {
	type GoogleRefreshedTokens,
	type GoogleTokens,
	OAuth2RequestError,
} from "arctic";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { googleScopes } from "../route";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);

	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");

	const savedState = cookies().get("oauth_state")?.value ?? null;
	const savedCodeVerifier = cookies().get("code_verifier")?.value ?? null;

	if (
		!state ||
		!code ||
		!savedState ||
		!savedCodeVerifier ||
		state !== savedState
	) {
		return new Response(null, { status: 400 });
	}

	try {
		const tokens: GoogleTokens = await google.validateAuthorizationCode(
			code,
			savedCodeVerifier,
		);
		let googleRefreshToken: GoogleRefreshedTokens | undefined = undefined;
		if (tokens.refreshToken) {
			googleRefreshToken = await google.refreshAccessToken(tokens.refreshToken);
		}

		const googleUserResponse = await fetch(
			"https://openidconnect.googleapis.com/v1/userinfo",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			},
		);
		const googleUser: GoogleUser = await googleUserResponse.json();

		if (!googleUser.email_verified) {
			return new Response("Unverified email", {
				status: 400,
			});
		}

		const existingUser = await db.query.userTable.findFirst({
			where: eq(userTable.email, googleUser.email),
		});

		let userId: string | null = null;
		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const { name, attributes, value } = lucia.createSessionCookie(session.id);
			cookies().set(name, value, attributes);

			return new Response(null, {
				status: 302,
				headers: {
					Location: "/",
				},
			});
		}
		userId = generateIdFromEntropySize(10);
		await db.transaction(async (trx) => {
			await trx.insert(userTable).values({
				id: userId as string,
				username: googleUser.name,
				email: googleUser.email,
				profileImage: googleUser.picture,
			});

			await trx.insert(oauthAccountTable).values({
				userId: userId as string,
				providerId: "google",
				providerUserId: googleUser.sub,
				accessToken: tokens.accessToken,
				refreshToken: googleRefreshToken?.accessToken,
				scope: googleScopes.join(", "),
			});
		});

		const session = await lucia.createSession(userId, {});
		const { name, attributes, value } = lucia.createSessionCookie(session.id);
		cookies().set(name, value, attributes);

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/",
			},
		});
	} catch (error) {
		if (error instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400,
			});
		}

		console.log((error as Error).message);
		return new Response(null, {
			status: 500,
		});
	}
}

// output example

// {
// 	sub: '113141198014688948969',
// 	name: 'Moh. ilhamuddin',
// 	given_name: 'Moh. ilhamuddin',
// 	picture: 'https://lh3.googleusercontent.com/a/ACg8ocJZnc3NLX3WvTjhjY5rudcP6u7jMeRyUzpDvzEErzywHqfGCnUm=s96-c',
// 	email: 'mohammad.ilhamuddin@gmail.com',
// 	email_verified: true
// }

interface GoogleUser {
	sub: string;
	name: string;
	given_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
}
