/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('/img/sfondoLogin.png')"
      }
    },
    colors: {
      bluPadelHub: 'rgb(47, 141, 206)',
      white: 'rgb(255, 255, 255)',
      bluPadelHubHover: 'rgb(32, 111, 166)',
      invalidForm: 'rgb(236, 72, 153)'
    }
  },
  plugins: [],
}

