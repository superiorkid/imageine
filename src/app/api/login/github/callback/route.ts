import db from "@/db";
import { oauthAccountTable, userTable } from "@/db/schema";
import { env } from "@/env";
import { github, lucia } from "@/lib/auth";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { githubScopes } from "../route";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);

	const error = url.searchParams.get("error");
	if (error) {
		redirect("/");
	}

	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("oauth_state")?.value ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);

		const [githubUserResponse, emailsResponse] = await Promise.all([
			fetch("https://api.github.com/user", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
					"User-Agent": env.APP_NAME,
				},
			}),
			fetch("https://api.github.com/user/emails", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			}),
		]);

		const githubUser: GitHubUser = await githubUserResponse.json();
		const emails: GithubEmail[] = await emailsResponse.json();

		const primaryEmail = emails.find((email) => email.primary) ?? null;
		if (!primaryEmail) {
			return new Response("No primary email address", {
				status: 400,
			});
		}
		if (!primaryEmail.verified) {
			return new Response("Unverified email", {
				status: 400,
			});
		}

		const existingUser = await db.query.userTable.findFirst({
			where: eq(userTable.email, primaryEmail.email),
		});

		let userId: string | null = null;

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
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
		}

		userId = generateIdFromEntropySize(10);
		await db.transaction(async (trx) => {
			await trx.insert(userTable).values({
				id: userId as string,
				username: githubUser.login,
				email: githubUser.email,
				profileImage: githubUser.avatar_url,
			});

			await trx.insert(oauthAccountTable).values({
				userId: userId as string,
				providerId: "github",
				providerUserId: githubUser.id,
				accessToken: tokens.accessToken,
				scope: githubScopes.join(", "),
			});
		});

		const session = await lucia.createSession(userId, {});
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

interface GitHubUser {
	id: string;
	login: string;
	email?: string;
	avatar_url: string;
}

interface GithubEmail {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility?: string | null;
}
