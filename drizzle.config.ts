import { env } from "@/env";
import { type Config, defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	out: "./drizzle",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	verbose: true,
	strict: true,
}) satisfies Config;
