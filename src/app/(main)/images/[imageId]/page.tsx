import Container from "@/components/container";
import ImageDetail from "@/components/image-detail";
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

	return (
		<Container className={cn("mt-9 mb-12 max-w-screen-md")}>
			<ImageDetail image={image} />
		</Container>
	);
};

export default ImageDetailPage;
