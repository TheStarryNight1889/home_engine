/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}

