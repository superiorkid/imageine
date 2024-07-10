"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/providers/search-store-provider";
import { useDebounce } from "@uidotdev/usehooks";
import { CircleXIcon } from "lucide-react";
import { useCallback } from "react";

const ResetSearchTerm = () => {
	const { searchTerm, setSearchTerm } = useSearchStore((state) => state);
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const handleResetTerm = useCallback(() => {
		setSearchTerm("");
	}, [setSearchTerm]);

	return (
		<Container>
			{debouncedSearchTerm && searchTerm.length > 0 && (
				<Button
					size="sm"
					variant="outline"
					title="reset search query"
					onClick={handleResetTerm}
				>
					<CircleXIcon className="size-3 mr-2" />
					Search result for{" "}
					<span className="font-semibold">{debouncedSearchTerm}</span>
				</Button>
			)}
		</Container>
	);
};

export default ResetSearchTerm;
