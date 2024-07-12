import db from "@/db";
import { oauthAccountTable, userTable } from "@/db/schema";
import { google, lucia } from "@/lib/auth";
import { type GoogleTokens, OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);

	console.log(url);

	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("oauth_state")?.value ?? null;
	const codeVerifier = cookies().get("code_verifier")?.value ?? null;

	if (!code || !state || !codeVerifier || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens: GoogleTokens = await google.validateAuthorizationCode(
			code,
			codeVerifier,
		);
		const googleUserResponse = await fetch(
			"https://openidconnect.googleapis.com/v1/userinfo",
			{
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
			await db.insert(oauthAccountTable).values({
				userId: existingUser.id,
				accessToken: tokens.accessToken,
				providerId: "google",
				providerUserId: googleUser.sub,
				refreshToken: tokens.refreshToken,
			});
		} else {
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
					accessToken: tokens.accessToken,
					providerId: "google",
					providerUserId: googleUser.sub,
					refreshToken: tokens.refreshToken,
				});
			});
		}

		const session = await lucia.createSession(
			userId ?? (existingUser?.id as string) ?? null,
			{},
		);
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/",
			},
		});
	} catch (error) {
		// the specific error message depends on the provider
		if (error instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
}

// output example
//
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
