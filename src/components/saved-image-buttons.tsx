import type { Full } from "unsplash-js/dist/methods/photos/types";
import SaveImage from "./save-image";
import SaveImageToCollections from "./save-image-to-collections";

interface SavedImageButtonsProps {
	image: Full;
}

const SavedImageButtons = ({ image }: SavedImageButtonsProps) => {
	return (
		<div className="border flex items-center rounded-lg overflow-hidden">
			<SaveImage image={image} />
			<SaveImageToCollections />
		</div>
	);
};

export default SavedImageButtons;
