CREATE TABLE IF NOT EXISTS "oauth_account" (
	"provider_id" text,
	"provider_user_id" text,
	"access_token" text,
	"refresh_token" text,
	"token_type" text,
	"scope" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_github_id_unique";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "profile_image" text;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "github_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "avatar";