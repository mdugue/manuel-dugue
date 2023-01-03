const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'media',
	theme: {
		fontFamily: {
			sans: ['var(--font-montserrat)', ...fontFamily.sans],
			display: ['var(--font-bungee)', ...fontFamily.sans],
			inline: ['var(--font-bungee-inline)', ...fontFamily.sans],
			shade: ['var(--font-bungee-shade)', ...fontFamily.sans],
		},
		extend: {
			screens: {
				coarse: { raw: '(pointer: coarse)' },
			},
			colors: {
				teal: colors.teal,
			},
			margin: {
				'-1/4': '-25%',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
