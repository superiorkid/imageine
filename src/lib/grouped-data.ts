type Collection = {
	id: number;
	name: string;
	createdAt: Date;
	description: string | null;
	userId: string;
};

type Image = {
	id: number;
	unsplashId: string;
	url: string;
	description?: string;
	altDescription: string;
	blurHash: string;
	uploadedAt: string;
};

export type Result = {
	collections: Collection | null;
	collections_to_images: {
		collectionId: number;
		imageId: number;
	};
	images: Image | null;
};

export function groupCollectionsByCollectionId(
	data: Result[],
): CollectionWithImages[] {
	return data.reduce((acc, result) => {
		const { collections, images } = result;
		const collectionId = collections?.id;

		if (!acc.find((item) => item.id === collectionId)) {
			acc.push({
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				...collections!,
				images: [],
			});
		}

		const collectionIndex = acc.findIndex((item) => item.id === collectionId);
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		acc[collectionIndex].images.push(images!);

		return acc;
	}, [] as CollectionWithImages[]); // Initialize accumulator as empty array
}

export type CollectionWithImages = Collection & { images: Image[] };
