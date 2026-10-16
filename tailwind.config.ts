/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#1e3c76", dark: "#142a54", light: "#2d5399" },
        secondary: { DEFAULT: "#29aad8", dark: "#1b8fbb", light: "#8bd6ef" },
        green: { DEFAULT: "#43ab5e", dark: "#2f8f48", light: "#e6f4ea" },
        aqua: { DEFAULT: "#1ba2bd", dark: "#14869c" },

        paper: "#f4f8fc",
        mist: "#dce6f2",
        ink: "#12244a",

        // legacy aliases -> new palette
        navy: { DEFAULT: "#1e3c76", 2: "#142a54" },
        amber: { DEFAULT: "#29aad8", dark: "#1b8fbb" },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        serif: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        mono: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out both",
        fadeIn: "fadeIn 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};