"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SearchImage = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
	const parentRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleFocus = useCallback(() => {
		if (parentRef.current) {
			parentRef.current.classList.add(
				"ring-2",
				"ring-offset-2",
				"ring-slate-400",
			);
		}
	}, []);

	const handleBlur = useCallback(() => {
		if (parentRef.current) {
			parentRef.current.classList.remove(
				"ring-2",
				"ring-offset-2",
				"ring-slate-400",
			);
		}
	}, []);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm((prevSearchTerm) => event.target.value);
	};

	const handleSearch = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		console.log(searchTerm);
	};

	useEffect(() => {
		const inputElement = inputRef.current;
		if (inputElement) {
			inputElement.addEventListener("focus", handleFocus);
			inputElement.addEventListener("blur", handleBlur);

			return () => {
				inputElement.removeEventListener("focus", handleFocus);
				inputElement.removeEventListener("blur", handleBlur);
			};
		}
	}, [handleBlur, handleFocus]);

	return (
		<div className="relative border p-1 rounded-xl" ref={parentRef}>
			<Input
				type="text"
				placeholder="Search image..."
				className="border-none focus-visible:ring-offset-0 focus-visible:ring-0 h-10 pr-9"
				ref={inputRef}
				onChange={handleSearchChange}
			/>
			<Button
				variant="ghost"
				size="icon"
				className="absolute right-1 size-10 top-1/2 -translate-y-1/2"
				onClick={handleSearch}
			>
				<SearchIcon className="size-5" />
				<span className="sr-only">Search button</span>
			</Button>
		</div>
	);
};

export default SearchImage;
