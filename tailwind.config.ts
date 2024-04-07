import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'dcard-blue': 'rgb(0, 106, 166)',
			},
            transitionTimingFunction: {
                'hover-transition': 'cubic-bezier(0.25, 0.1, 0.25, 1)'
            }
		},
	},
	plugins: [],
};
export default config;
