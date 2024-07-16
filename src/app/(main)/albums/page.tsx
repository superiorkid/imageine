import Container from "@/components/container";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const AlbumsPage = async () => {
	const { session, user } = await validateRequest();

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<div>
			<Container className="mt-5 mb-12 space-y-4">
				<h1 className="text-2xl font-medium leading-none">
					{user.username} albums
				</h1>

				<div>albums</div>
			</Container>
		</div>
	);
};

export default AlbumsPage;
