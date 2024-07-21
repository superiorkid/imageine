import { getUserCollectionImagesAction } from "@/actions/image-action";
import Container from "@/components/container";
import { validateRequest } from "@/lib/auth";

import {
	type Result,
	groupCollectionsByCollectionId,
} from "@/lib/grouped-data";
import Image from "next/image";
import { redirect } from "next/navigation";

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
				<h1 className="text-2xl font-medium leading-none">
					{user.username} albums
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{groupedCollections.map((collection) => (
						<div key={collection.id}>
							<div className="aspect-square">
								<div className="grid grid-cols-2 gap-2">
									{collection.images.slice(0, 4).map((image) => (
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
								</div>
							</div>
							<div>
								<h2 className="font-medium text-sm">{collection.name}</h2>
								<p className="text-xs text-muted-foreground">
									{collection.createdAt.toDateString()}
								</p>
							</div>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default AlbumsPage;
