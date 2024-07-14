import ImageDetail from "@/components/image-detail";
import Modal from "@/components/modal";
import { getImage } from "@/queries/image-query";

interface InterceptingImageModalProps {
	params: {
		imageId: string;
	};
}

const InterceptingImageModal = async ({
	params: { imageId },
}: InterceptingImageModalProps) => {
	const image = await getImage(imageId);

	return (
		<Modal>
			<ImageDetail image={image} />
		</Modal>
	);
};

export default InterceptingImageModal;
