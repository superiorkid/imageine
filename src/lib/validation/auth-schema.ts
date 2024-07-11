import { z } from "zod";

export const signUpSchema = z.object({
	email: z.string().email().min(1, { message: "email is required" }),
	username: z.string().min(4).max(24).trim(),
	password: z.string().min(6),
});
export type SignUp = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
	email: z.string().email().min(1, { message: "email is required" }),
	password: z.string().min(1, { message: "password is required" }),
});
export type SignIn = z.infer<typeof signInSchema>;
