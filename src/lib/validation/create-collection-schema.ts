import { z } from "zod";

export const createCollectionSchema = z.object({
	name: z.string().min(1, { message: "collection name is required" }),
	description: z.string().nullable(),
});

export type CreateCollectionSchema = z.infer<typeof createCollectionSchema>;
