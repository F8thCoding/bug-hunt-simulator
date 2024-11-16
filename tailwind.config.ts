import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#1A1F2C",
        foreground: "#F1F0FB",
        primary: {
          DEFAULT: "#8B5CF6",
          foreground: "#F1F0FB",
        },
        secondary: {
          DEFAULT: "#6E59A5",
          foreground: "#F1F0FB",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#F1F0FB",
        },
        warning: {
          DEFAULT: "#F97316",
          foreground: "#F1F0FB",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#F1F0FB",
        },
        muted: {
          DEFAULT: "#374151",
          foreground: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#6E59A5",
          foreground: "#F1F0FB",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "matrix-flow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "matrix-flow": "matrix-flow 10s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;