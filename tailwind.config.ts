import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class", "html"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
} satisfies Config

export default config