const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const BungeeFallbacks = [
  'Bungee',
  'SF Mono',
  'Ubuntu Mono',
  'Consolas',
  ...fontFamily.serif,
]

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    fontFamily: {
      body: ['Montserrat', ...fontFamily.sans],
      display: ['Bungee', ...BungeeFallbacks],
      inline: ['Bungee Inline', ...BungeeFallbacks],
      shade: ['Bungee Shade', ...BungeeFallbacks],
    },
    extend: {
      screens: {
        print: { raw: 'print' },
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
