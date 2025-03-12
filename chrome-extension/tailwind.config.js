/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/popup.html", // Tailwind should scan your popup HTML
    "./src/**/*.{vue,js,ts}" // Scan all Vue and script files in your src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
