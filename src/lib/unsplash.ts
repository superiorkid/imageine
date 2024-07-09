import { env } from "@/env";
import * as nodeFetch from "node-fetch";
import { createApi } from "unsplash-js";

export const unsplash = createApi({
	accessKey: env.UNSPLASH_ACCESS_KEY,
	fetch: nodeFetch.default as unknown as typeof fetch,
});
