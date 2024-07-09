import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	images: {
		remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
	},
};

export default withPlaiceholder(nextConfig);
