import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		UNSPLASH_ACCESS_KEY: z.string().min(1),
		UNSPLASH_SECRET_KEY: z.string().min(1),
		UNSPLASH_URL: z.string().url(),
		DATABASE_URL: z.string().url(),
		NODE_ENV: z
			.enum(["production", "development", "test"])
			.default("development"),
	},
	client: {},
	runtimeEnv: {
		UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
		UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
		UNSPLASH_URL: process.env.UNSPLASH_URL,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
	},
});
