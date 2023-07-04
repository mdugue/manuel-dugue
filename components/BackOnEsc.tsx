'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useKeyPressEvent } from 'react-use'

export default function BackOnEsc() {
	const router = useRouter()
	const pathName = usePathname()
	useKeyPressEvent('Escape', () => {
		if (!pathName) return
		const segments = pathName.split('/')
		router.push('/' + segments[1])
	})

	return <></>
}
