import type { CodegenConfig } from "@graphql-codegen/cli";

import dotenv from "dotenv";

dotenv.config();

const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const config: CodegenConfig = {
	schema: {
		[url]: {
			headers: {
				Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
			},
		},
	},
	documents: ["./**/*.tsx", "./**/*.ts"],
	generates: {
		"./gql/": {
			preset: "client",
		},
	},
};
export default config;
