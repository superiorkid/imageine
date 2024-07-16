import { z } from "zod";

export const saveImageSchema = z.object({
	unsplashId: z.string().min(1, { message: "unsplash id is required" }),
	url: z.string().url().min(1, { message: "URL is required" }),
	description: z.string().nullable(),
	altDescription: z.string().nullable(),
	blurHash: z.string().nullable(),
	uploadedAt: z.string().datetime({ offset: true, precision: 3 }),
	position: z.object({
		name: z.string().min(1, { message: "position name is required." }),
		latitude: z.string().nullable(),
		longtitude: z.string().nullable(),
	}),
	author: z.object({
		name: z.string().min(1, { message: "author name is required." }),
		avatar: z.string().url().nullable(),
	}),
});

export type SaveImageSchema = z.infer<typeof saveImageSchema>;
