import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		APP_NAME: z.string().min(1),
		BASE_URL: z.string().url(),
		UNSPLASH_ACCESS_KEY: z.string().min(1),
		UNSPLASH_SECRET_KEY: z.string().min(1),
		UNSPLASH_URL: z.string().url(),
		DATABASE_URL: z.string().url(),
		NODE_ENV: z
			.enum(["production", "development", "test"])
			.default("development"),
		GITHUB_CLIENT_ID: z.string().min(1),
		GITHUB_CLIENT_SECRET: z.string().min(1),
		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		DEFAULT_SEARCH_QUERY: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_BASE_URL: z.string().url(),
	},
	runtimeEnv: {
		APP_NAME: process.env.APP_NAME,
		BASE_URL: process.env.BASE_URL,
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
		UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
		UNSPLASH_URL: process.env.UNSPLASH_URL,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		DEFAULT_SEARCH_QUERY: process.env.DEFAULT_SEARCH_QUERY,
	},
});
