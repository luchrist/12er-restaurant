import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bone: "#FAF8F5",
        creme: "#F1ECE3",
        ink: "#171717",
        wald: {
          50: "#FDECEC",
          100: "#F9C8CA",
          200: "#F19497",
          300: "#E86165",
          400: "#DE3B40",
          500: "#DC1F26",
          600: "#B4181D",
          700: "#8B1216",
          800: "#620D0F",
          900: "#3E0708"
        },
        messing: {
          50: "#F7F3EC",
          100: "#EBE2D0",
          200: "#D9C9A6",
          300: "#C4AC78",
          400: "#B29862",
          500: "#9C824F",
          600: "#7F6A40",
          700: "#625231",
          800: "#463A22",
          900: "#2B2314"
        },
        weinrot: {
          50: "#F4E6E7",
          100: "#DFB6B9",
          200: "#C68186",
          300: "#AC4F55",
          400: "#8C2A30",
          500: "#6B181D",
          600: "#571317",
          700: "#420E11",
          800: "#2E090C",
          900: "#1A0507"
        }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"]
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      }
    }
  },
  plugins: []
};

export default config;
