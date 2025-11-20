require("dotenv").config(); // make .env file available

const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

module.exports = {
	schema: {
		[url]: {
			headers: {
				Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
			},
		},
	},
};
