import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	typescript: {
		ignoreBuildErrors: true, // This is the correct flag
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
