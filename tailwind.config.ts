import type {Config} from "tailwindcss";

export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	// theme: {
	// 	extend: {
	// 		fontFamily: {
	// 			sans: ["Inter", "sans-serif"],
	// 			lato: ["Lato", "sans-serif"],
	// 		},
	// 		colors: {
	// 			// panel1: "#F8F8F5",
	// 			// panel2: "#F2F2ED",
	// 			// panel1: "#F6F6F6",
	// 			// panel2: "#EDEDED",
	// 			panel1: "#f8f8f8",
	// 			panel2: "#e9e9e9",
	// 			brandDark: "#013357",
	// 			grayWhite: "#ffffff",
	// 			grayLight: "#6E6E6E",
	// 			grayLighter: "#A5A5A5",
	// 			grayLightest: "#D7D7D7",
	// 			grayMid: "#424242",
	// 			grayBlack: "#000000",
	// 			uiPrimary: "#18A0FB",
	// 			uiPrimaryDark: "#1176BB",
	// 			uiPrimaryLight: "#E6F5FF",
	// 		},
	// 	},
	// },
	plugins: [],
} satisfies Config;
