import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
	`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
	{
		fetch,
		headers: { Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}` },
	}
);
