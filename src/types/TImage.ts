import type { Basic, Full } from "unsplash-js/dist/methods/photos/types";

export interface ImageWithBlurDataUrl extends Full {
	blurDataUrl: string;
}
