'use client'
import { useRouter } from 'next/navigation'
import { useKeyPressEvent } from 'react-use'

export default function BackOnEsc() {
	const router = useRouter()
	useKeyPressEvent('Escape', () => router.push('/'))

	return <></>
}
