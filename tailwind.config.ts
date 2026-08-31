import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08090a",
          900: "#0c0d0f",
          850: "#111316",
          800: "#16181c",
          700: "#202329",
          600: "#2b2f37",
          500: "#3a3f49",
        },
        accent: {
          DEFAULT: "#d4a017",
          soft: "#f0c14b",
          dim: "#8a6c15",
        },
        paper: {
          DEFAULT: "#f5f5f4",
          muted: "#a7a9ae",
        },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "Tahoma", "Arial", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        card: "0 20px 45px -20px rgba(0,0,0,0.55)",
        glow: "0 0 0 1px rgba(212,160,23,0.25), 0 12px 30px -10px rgba(212,160,23,0.35)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
