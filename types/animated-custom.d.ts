import reactSpring from '@react-spring/web'
declare module '@react-spring/web' {
	const animated = {
		children: React.ReactNode,
		...reactSpring.animated,
	}
}
