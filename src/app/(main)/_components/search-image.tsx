"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FocusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const SearchImage = () => {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const parentRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleFocus = useCallback(() => {
		if (parentRef.current) {
			parentRef.current.classList.add("ring-2", "ring-slate-400", "bg-white");
		}
	}, []);

	const handleBlur = useCallback(() => {
		if (parentRef.current) {
			parentRef.current.classList.remove(
				"ring-2",
				"ring-slate-400",
				"bg-white",
			);
		}
	}, []);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleSearch = () => {
		router.push(`/search?q=${searchTerm}`);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const inputElement = inputRef.current;
		if (inputElement) {
			inputElement.addEventListener("focus", handleFocus);
			inputElement.addEventListener("blur", handleBlur);
			inputElement.addEventListener("keydown", (event) => {
				if (event.code === "Enter" && searchTerm?.length > 0) {
					handleSearch();
				}
			});

			return () => {
				inputElement.removeEventListener("focus", handleFocus);
				inputElement.removeEventListener("blur", handleBlur);
			};
		}
	}, [handleBlur, handleFocus, searchTerm]);

	return (
		<div
			className="relative border p-1 rounded-lg bg-[#EEEEEE]"
			ref={parentRef}
		>
			<Input
				type="text"
				placeholder="Search photos..."
				className="border-none focus-visible:ring-offset-0 bg-transparent focus-visible:ring-0 h-10 pr-9"
				ref={inputRef}
				onChange={handleSearchChange}
			/>
			<Button
				variant="ghost"
				size="icon"
				className="absolute right-1 size-10 top-1/2 -translate-y-1/2"
				onClick={handleSearch}
			>
				<FocusIcon className="size-6 stroke-slate-600" />
				<span className="sr-only">Search button</span>
			</Button>
		</div>
	);
};

export default SearchImage;
