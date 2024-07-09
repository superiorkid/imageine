import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		UNSPLASH_ACCESS_KEY: z.string().min(1),
		UNSPLASH_SECRET_KEY: z.string().min(1),
	},
	client: {},
	runtimeEnv: {
		UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
		UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
	},
});
