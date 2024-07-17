import ImageDetail from "@/components/image-detail";
import Modal from "@/components/modal";
import { validateRequest } from "@/lib/auth";
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
	const { session } = await validateRequest();

	return (
		<Modal>
			<ImageDetail image={image} isAuth={!!session} />
		</Modal>
	);
};

export default InterceptingImageModal;
