/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			width: {
				"36.": "36rem",
				"28.": "28rem",
			},
			height: {
				"78.": "78vh",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontSize: {
				semiBase: ".65rem",
				zx: ".5rem",
				z: ".35rem",
			},
			colors: {
				primaryBackground: "var(--primary-background)",
				secondaryBackground: "var(--secondary-background)",
				thirdBackground: "var(--third-background)",
				primaryForeground: "var(--primary-foreground)",
				secondaryForeground: "var(--secondary-foreground)",
				thirdForeground: "var(--third-foreground)",											
				accent: "var(--accent)",
				active: "var(--active)",
				disabled: "var(--disabled)",
				successForeground: "var(--success-foreground)",
				destructiveForeground: "var(--destructive-foreground)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
		screens: {
			md: "768px",
			dm: { max: "768px" },
		},
	},
	plugins: [import("tailwindcss-animate")],
};
