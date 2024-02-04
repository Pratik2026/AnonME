import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [keepPreset],
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