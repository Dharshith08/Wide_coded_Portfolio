import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#080c14",
        surface: "#111827",
        glass: "rgba(15, 23, 42, 0.55)",
        accent: "#36d7b7",
        warm: "#f5b971",
        text: "#e5eef8",
        muted: "#8ba3bb"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(54,215,183,0.28), 0 25px 60px rgba(12,20,35,0.45)"
      },
      backdropBlur: {
        xs: "2px"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"]
      },
      backgroundImage: {
        "hero-grid": "radial-gradient(circle at 1px 1px, rgba(139,163,187,0.2) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
