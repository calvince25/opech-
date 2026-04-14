import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        stone: {
          50: "#f9f8f6",
          100: "#f2f1ee",
          200: "#e5e3db",
          300: "#d2cfc4",
          400: "#b5b0a3",
          500: "#9b9484",
          600: "#807868",
          700: "#686154",
          800: "#554f46",
          900: "#46413a",
          950: "#25221e",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s cubic-bezier(0.2, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
