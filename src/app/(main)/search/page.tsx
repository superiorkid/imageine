import Container from "@/components/container";
import { getImages } from "@/queries/image-query";
import { redirect } from "next/navigation";
import Images from "../_components/images";

interface SearchPageProps {
	searchParams: {
		q: string;
	};
}

const SearchPage = async ({ searchParams: { q } }: SearchPageProps) => {
	if (!q) {
		redirect("/");
	}

	const images = await getImages({ keyword: q });

	return (
		<Container className="mt-5 mb-12 space-y-4">
			<h1 className="text-3xl font-bold leading-none">{q}</h1>

			<div>
				<Images initialValue={images.data} keyword={q} />
			</div>
		</Container>
	);
};

export default SearchPage;
