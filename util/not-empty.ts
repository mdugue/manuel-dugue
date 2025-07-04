/** removes empty elements from an array, so that TypeScript knows */
export default function notEmpty<TValue>(
	value: TValue | null | undefined
): value is TValue {
	return value != null;
}
