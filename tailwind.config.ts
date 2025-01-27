import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navyBlue: "#05081C",
        blue: "#0A0D36",
        lightBlue: "#0F1042",
        exBlue: "#0E1D3E",
        logoGray: "#634E4F",
        logoBlue: "#65969E",
      },
    },
  },
  plugins: [],
} satisfies Config;
