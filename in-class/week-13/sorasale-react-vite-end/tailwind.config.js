/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        base: "rgb(var(--ui-base) / <alpha-value>)",
        secondary: "rgb(var(--ui-secondary) / <alpha-value>)",
        accent: "rgb(var(--ui-accent) / <alpha-value>)",
        tcolor: "rgb(var(--text-color) / <alpha-value>)",
        tmuted: "rgb(var(--text-color) / <alpha-value>)",
        bordercolor: "rgb(var(--border-color) / <alpha-value>)",
      },
      fontFamily: {
        Inter: "Inter",
        Roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "bg-texture": "url('./assets/bg.png')",
      }
    },
  },
  plugins: [],
}

