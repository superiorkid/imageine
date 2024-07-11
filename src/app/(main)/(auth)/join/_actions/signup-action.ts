"use server";

import db from "@/db";
import { userTable } from "@/db/schema";
import { signUpSchema } from "@/lib/validation/auth-schema";
import { hash } from "@node-rs/argon2";
import { eq, or } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";

export async function signupAction(formData: FormData) {
	const email = formData.get("email") as string;
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	const inputValidation = signUpSchema.safeParse({ username, email, password });
	if (!inputValidation.success) {
		return {
			error: inputValidation.error.errors.at(0)?.message,
		};
	}

	const user = await db.query.userTable.findFirst({
		where: or(eq(userTable.email, email), eq(userTable.username, username)),
	});

	if (user) {
		throw new Error("User already exists");
		// return {
		// 	error: "user already exists",
		// };
	}

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});
	const userId = generateIdFromEntropySize(10); // 16 characters long

	await db.insert(userTable).values({
		id: userId,
		passwordHash,
		username,
		email,
	});

	return {
		message: "register successfully",
	};
}
