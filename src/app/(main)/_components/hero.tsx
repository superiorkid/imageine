import Container from "@/components/container";
import GridPattern from "@/components/ui/magic-pattern";
import { cn } from "@/lib/utils";
import SearchImage from "./search-image";

const Hero = () => {
	return (
		<Container className="flex justify-center min-h-[39dvh] items-center relative">
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

				<div className="max-w-lg mx-auto">
					<SearchImage />
				</div>
			</div>

			<GridPattern
				width={30}
				height={30}
				x={-1}
				y={-1}
				strokeDasharray={"4 2"}
				className={cn(
					"[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] -z-10",
				)}
			/>
		</Container>
	);
};

export default Hero;
