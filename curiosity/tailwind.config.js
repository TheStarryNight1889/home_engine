/** @type {import('tailwindcss').Config} */
export default  {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [import("daisyui")],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}

