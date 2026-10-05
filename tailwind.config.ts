import type { Config } from "tailwindcss";

/**
 * Every colour and font here points at a token in src/index.css (:root).
 * Change a value there and it changes everywhere; nothing is defined twice.
 */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: 'var(--font-sans)',
				serif: 'var(--font-serif)',
				mono: 'var(--font-mono)',
			},
			colors: {
				/* Surfaces */
				background: 'hsl(var(--bg))',
				card: 'hsl(var(--surface))',
				plate: 'hsl(var(--work))',
				screen: 'hsl(var(--screen))',
				secondary: 'hsl(var(--tint))',
				/* Ink */
				foreground: 'hsl(var(--fg))',
				muted: { foreground: 'hsl(var(--muted-ink))' },
				/* Lines and accents */
				border: 'hsl(var(--rule))',
				mark: 'hsl(var(--mark))',
				/* Red text (errors) uses the darker red so it stays readable on paper. */
				destructive: 'hsl(var(--mark-ink))',
			},
			borderRadius: {
				/* Editorial layouts are square. */
				lg: '0',
				md: '0',
				sm: '0',
			},
		}
	},
	plugins: [],
} satisfies Config;
