export type SupportedType = 'cv' | 'skill profile'

export default function checkCVSPType(
	type: string,
): asserts type is SupportedType {
	if (type !== 'cv' && type !== 'skill profile')
		throw new Error('invalid type: ' + type, { cause: type })
}
