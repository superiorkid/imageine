import Container from "@/components/container";
import ImageDetail from "@/components/image-detail";
import { validateRequest } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getImage } from "@/queries/image-query";

interface ImageDetailPageProps {
	params: {
		imageId: string;
	};
}

const ImageDetailPage = async ({
	params: { imageId },
}: ImageDetailPageProps) => {
	const image = await getImage(imageId);
	const { session } = await validateRequest();

	return (
		<Container className={cn("mt-9 mb-12 max-w-screen-md")}>
			<ImageDetail image={image} isAuth={!!session} />
		</Container>
	);
};

export default ImageDetailPage;
