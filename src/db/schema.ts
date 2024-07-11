import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	email: text("email"),
	passwordHash: text("password_hash"),
	github_id: text("github_id").unique(),
	avatar: text("avatar"),
});

export const oauthAccountTable = pgTable("oauth_account", {});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});
