/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        'lg': '1rem'
      },
      backgroundImage: {
        'login': "url('/img/sfondoLogin.png')"
      }
    },
    colors: {
      bluPadelHub: 'rgb(47, 141, 206)',
      accentPadelHub: 'rgb(255, 153, 85)',
      white: 'rgb(255, 255, 255)',
      bluPadelHubHover: 'rgb(32, 111, 166)',
      invalidForm: 'rgb(236, 72, 153)',
      greenFree: 'rgb(198, 239, 144)',
      yellowReserved: 'rgb(251, 244, 94)',
      redBusy: 'rgb(248, 106, 106)',

      simpleGrey: 'rgb(148, 163, 184)'
    },
    fontFamily: {
      'circolo': '"KoHo", sans-serif'
    }
  },
  plugins: [],
}

