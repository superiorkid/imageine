import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import SearchImage from "./search-image";

const Hero = () => {
	return (
		<Container className="flex justify-center min-h-[43dvh] items-center">
			<div className="space-y-6">
				<div className="text-center max-w-2xl space-y-1.5">
					<h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
						Discover Stunning Images
					</h1>
					<p className="text-xl text-muted-foreground">
						Explore our vast collection of breathtaking images and find the
						perfect ones for your next project.
					</p>
				</div>

				<div className="max-w-md mx-auto">
					<SearchImage />
				</div>
			</div>
		</Container>
	);
};

export default Hero;
