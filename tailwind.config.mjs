/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#1F2041',
				secondary: '#4B3F72',
				tertiary: '#119DA4',
			},
		},
	},
	plugins: [],
}
