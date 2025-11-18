import { gql } from "graphql-request";

export const pageQuery = gql`
	query AllInOnePage($slug: String!, $locale: String) {
		allInOnePageCollection(limit: 1, where: { slug: $slug }) {
			total
			items {
				sys {
					id
				}
				slug
				__typename

				title(locale: $locale)
				content(locale: $locale) {
					json
				}
			}
		}
	}
`;
