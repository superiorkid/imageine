import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getImage } from "@/queries/image-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(utc);

interface ImageDetailPageProps {
	params: {
		imageId: string;
	};
}

const ImageDetailPage = async ({
	params: { imageId },
}: ImageDetailPageProps) => {
	const image = await getImage(imageId);
	const isLandscape = image.width > image.height;
	const formattedDate = dayjs(image.created_at).format("MMMM DD, YYYY");

	return (
		<Container className={cn("mt-9 mb-12 max-w-screen-md")}>
			<div className="flex items-center space-x-2">
				<Avatar className="size-11">
					<AvatarImage
						src={image.user.profile_image.small}
						alt={`${image.user.name} profile`}
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className="space-y-1.5">
					<h5 className="font-bold leading-none">{image.user.name}</h5>
					<p className="text-sm leading-none font-medium text-muted-foreground">
						{image.alt_description}
					</p>
				</div>
			</div>
			<div
				className={cn(
					"relative mt-2.5 rounded-lg overflow-auto",
					isLandscape ? "aspect-[3/2]" : "aspect-[1/1]",
				)}
			>
				<Image
					fill
					src={image.urls.regular}
					alt={image.alt_description as string}
					className="object-cover "
					placeholder="blur"
					blurDataURL={image.blurDataUrl}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					loading="lazy"
				/>
			</div>

			<div className="mt-4">
				<div className="flex flex-col space-y-2">
					<h1 className="font-medium text-sm leading-none">
						{image.location.name ?? "Location not provided"}
					</h1>
					<small className="text-sm font-medium leading-none text-muted-foreground">
						{formattedDate}
					</small>
				</div>
				<div className="mt-3">
					{/* TODO: fixed pinned location */}
					<Link
						href={`https://www.google.com/maps/@${image.location.position.latitude},${image.location.position.longitude},18.58z?entry=ttu`}
						target="_blank"
						className="text-sm flex items-center underline font-medium text-sky-600"
					>
						See location
						<ArrowUpRightIcon className="size-4 ml-2" />
					</Link>
				</div>
			</div>
		</Container>
	);
};

export default ImageDetailPage;
