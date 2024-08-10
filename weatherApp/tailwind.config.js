/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        color1:'#15719f',
        color2:'#528ab4',
        color3:'#62a1c7',
        color4:'#7bc7dd',
        color5:'#95d6ea',
      },
    },
  },
  plugins: [],
}