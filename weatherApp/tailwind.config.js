/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        color1:'#2b235a',
        color2:'#54416d',
      },
    },
  },
  plugins: [],
}