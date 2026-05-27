/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soviet: {
          red: "#0D5C75",
          gold: "#D97706",
          orange: "#0EA5E9",
          white: "#ffffff",
          offwhite: "#FAFAF9",
          darkred: "#083F51",
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      boxShadow: {
        'red-glow': '0 0 15px rgba(13, 92, 117, 0.2)',
        'gold-glow': '0 0 15px rgba(217, 119, 6, 0.2)',
      }
    },
  },
  plugins: [],
}
