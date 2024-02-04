/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'my2': '25%, 75%',
    },
    gridTemplateRows: {
      'my3': '10%, 80%, 10%',
      'mycc3': '12%, 78%, 10%',
  },
  },
},
  plugins: [],
}