import { getUserCollectionImagesAction } from "@/actions/image-action";
import Container from "@/components/container";
import { validateRequest } from "@/lib/auth";

import {
	type Result,
	groupCollectionsByCollectionId,
} from "@/lib/grouped-data";
import { ImageOffIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export const revalidate = 0;

const AlbumsPage = async () => {
	const { session, user } = await validateRequest();
	const collections = (await getUserCollectionImagesAction(
		user?.id as string,
	)) as Result[];

	const groupedCollections = groupCollectionsByCollectionId(collections);

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<div>
			<Container className="mt-5 mb-12 space-y-6">
				<h1 className="text-2xl font-medium leading-none">Your collections</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{groupedCollections.map((collection) => {
						const imageToShow = collection.images.slice(0, 4);
						const placeholders = 4 - imageToShow.length;

						return (
							<div key={collection.id} className="space-y-2.5">
								<div className="aspect-square">
									<div className="grid grid-cols-2 gap-2.5">
										{imageToShow.map((image) => (
											<div
												className="relative aspect-square rounded-lg overflow-hidden"
												key={image.id}
											>
												<Image
													fill
													src={image.url}
													alt={`${image.description} image`}
													className="object-cover"
												/>
											</div>
										))}
										{Array.from({ length: placeholders }).map((_, index) => (
											<div
												className="aspect-square flex justify-center items-center bg-zinc-100 rounded-lg dark:bg-zinc-800"
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={index}
											>
												<ImageOffIcon className="size-7 stroke-muted-foreground" />
											</div>
										))}
									</div>
								</div>
								<div>
									<h2 className="font-medium text-sm">{collection.name}</h2>
									<p className="text-xs text-muted-foreground">
										{collection.createdAt.toDateString()}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</Container>
		</div>
	);
};

export default AlbumsPage;
