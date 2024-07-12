import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	email: text("email"),
	passwordHash: text("password_hash"),
	profileImage: text("profile_image"),
	createdAt: timestamp("created_at", {
		mode: "date",
		precision: 3,
	}).defaultNow(),
});

export const userTableRelations = relations(userTable, ({ many }) => ({
	accounts: many(oauthAccountTable),
}));

export const oauthAccountTable = pgTable(
	"oauth_account",
	{
		providerId: text("provider_id"),
		providerUserId: text("provider_user_id"),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		tokenType: text("token_type"),
		scope: text("scope"),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		userId: text("user_id")
			.notNull()
			.references(() => userTable.id, { onDelete: "cascade" }),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
		};
	},
);

export const oauthAccountTableRelation = relations(
	oauthAccountTable,
	({ one }) => ({
		user: one(userTable, {
			fields: [oauthAccountTable.userId],
			references: [userTable.id],
		}),
	}),
);

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});
