/* eslint-disable */

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
	'\n\tquery AllInOnePage($slug: String!, $locale: String) {\n\t\tallInOnePageCollection(limit: 1, where: { slug: $slug }) {\n\t\t\ttotal\n\t\t\titems {\n\t\t\t\tsys {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tslug\n\t\t\t\t__typename\n\n\t\t\t\ttitle(locale: $locale)\n\t\t\t\tcontent(locale: $locale) {\n\t\t\t\t\tjson\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n':
		types.AllInOnePageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tquery AllInOnePage($slug: String!, $locale: String) {\n\t\tallInOnePageCollection(limit: 1, where: { slug: $slug }) {\n\t\t\ttotal\n\t\t\titems {\n\t\t\t\tsys {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tslug\n\t\t\t\t__typename\n\n\t\t\t\ttitle(locale: $locale)\n\t\t\t\tcontent(locale: $locale) {\n\t\t\t\t\tjson\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery AllInOnePage($slug: String!, $locale: String) {\n\t\tallInOnePageCollection(limit: 1, where: { slug: $slug }) {\n\t\t\ttotal\n\t\t\titems {\n\t\t\t\tsys {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tslug\n\t\t\t\t__typename\n\n\t\t\t\ttitle(locale: $locale)\n\t\t\t\tcontent(locale: $locale) {\n\t\t\t\t\tjson\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n'];

export function graphql(source: string) {
	return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
