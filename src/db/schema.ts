import { relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

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
	collections: many(collection),
	usersToImages: many(usersToImages),
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

export const collection = pgTable("collections", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description"),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const collectionsRelations = relations(collection, ({ many, one }) => ({
	collectionsToImages: many(collectionsToImages),
	user: one(userTable, {
		fields: [collection.userId],
		references: [userTable.id],
	}),
}));

export const image = pgTable("images", {
	id: serial("id").primaryKey(),
	unsplashId: varchar("unsplash_id", { length: 255 }).notNull(),
	url: text("url").notNull(),
	description: text("description"),
	altDescription: text("alt_description"),
	blurHash: text("blur_hash"),
	uploadedAt: timestamp("uploaded_at", { mode: "date", precision: 3 }),
});

export const imagesRelations = relations(image, ({ many, one }) => ({
	position: one(position, {
		fields: [image.id],
		references: [position.imageId],
	}),
	author: one(authorImage, {
		fields: [image.id],
		references: [authorImage.imageId],
	}),
	collectionsToImages: many(collectionsToImages),
	usersToImages: many(usersToImages),
}));

export const position = pgTable("positions", {
	id: serial("id").primaryKey(),
	imageId: integer("image_id")
		.notNull()
		.references(() => image.id, {
			onDelete: "cascade",
		}),
	name: text("name"),
	latitude: varchar("latitude", { length: 100 }),
	longtitude: varchar("longtitude", { length: 100 }),
});

export const authorImage = pgTable("author_images", {
	id: serial("id").primaryKey(),
	imageId: integer("image_id").references(() => image.id, {
		onDelete: "cascade",
	}),
	name: varchar("name", { length: 255 }).notNull(),
	profileImage: text("avatar"),
});

export const collectionsToImages = pgTable(
	"collections_to_images",
	{
		collectionId: integer("collection_id")
			.notNull()
			.references(() => collection.id, { onDelete: "cascade" }),
		imageId: integer("image_id")
			.notNull()
			.references(() => image.id, { onDelete: "cascade" }),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.collectionId, t.imageId] }),
	}),
);

export const collectionsToImagesRelations = relations(
	collectionsToImages,
	({ one }) => ({
		collections: one(collection, {
			fields: [collectionsToImages.collectionId],
			references: [collection.id],
		}),
		images: one(image, {
			fields: [collectionsToImages.imageId],
			references: [image.id],
		}),
	}),
);

export const usersToImages = pgTable(
	"users_to_images",
	{
		userId: text("user_id")
			.notNull()
			.references(() => userTable.id, { onDelete: "cascade" }),
		imageId: integer("image_id")
			.notNull()
			.references(() => image.id, { onDelete: "cascade" }),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.imageId] }),
	}),
);

export const usersToImagesRelations = relations(usersToImages, ({ one }) => ({
	user: one(userTable, {
		fields: [usersToImages.userId],
		references: [userTable.id],
	}),
	images: one(image, {
		fields: [usersToImages.imageId],
		references: [image.id],
	}),
}));
