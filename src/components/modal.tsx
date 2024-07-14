"use client";

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import type { FC, ReactNode } from "react";

interface ModalProps {
	children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
	const router = useRouter();

	const handleOnOpenChange = (open: boolean) => {
		if (!open) {
			router.back();
		}
	};

	return (
		<Dialog open onOpenChange={handleOnOpenChange}>
			<DialogOverlay className="bg-black/35 backdrop-blur-lg" />
			<DialogContent hideCloseButton className="max-w-xl max-h-[95dvh]">
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
