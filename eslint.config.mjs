import nextConfig from "eslint-config-next";

const config = [
	...nextConfig,
	{
		ignores: ["gql/**"],
	},
];

export default config;
