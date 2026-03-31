/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-1': '#2d3436',
        'dark-2': '#57606f',
        'light-1': '#f1f2f6',
        'light-2': '#dfe6e9',
        'terminal': '#2f3542',
        'terminal-header': '#3d4452',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
