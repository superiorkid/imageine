import Container from "@/components/container";
import { redirect } from "next/navigation";

interface SearchPageProps {
	searchParams: {
		q: string;
	};
}

const SearchPage = ({ searchParams: { q } }: SearchPageProps) => {
	if (!q) {
		redirect("/");
	}

	return (
		<Container>
			<p>search results for {q}</p>
		</Container>
	);
};

export default SearchPage;
