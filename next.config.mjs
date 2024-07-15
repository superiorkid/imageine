/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "plus.unsplash.com" },
			{ protocol: "https", hostname: "lh3.googleusercontent.com" },
		],
	},
	experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"],
	},
};

export default nextConfig;
