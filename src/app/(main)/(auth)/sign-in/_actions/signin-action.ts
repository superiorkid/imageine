"use server";

import db from "@/db";
import { userTable } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { signInSchema } from "@/lib/validation/auth-schema";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function loginAction(
	formData: FormData,
): Promise<{ message: string }> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	// validate user input
	const inputValidation = signInSchema.safeParse({ email, password });
	if (!inputValidation.success) {
		throw new Error(inputValidation.error.errors.at(0)?.message);
	}

	const existingUser = await db.query.userTable.findFirst({
		where: eq(userTable.email, email),
	});

	if (!existingUser) {
		throw new Error("Incorrect email or password");
	}

	const validPassword = await verify(
		existingUser.passwordHash as string,
		password,
		{
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		},
	);
	if (!validPassword) {
		throw new Error("Incorrent email or password");
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);

	return {
		message: "login successfully",
	};
}
