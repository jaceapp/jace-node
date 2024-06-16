/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'jace-',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chatBackground: '#111111',
        defaultText: '#DFDFDF',
        inputBackground: '#282828',
        placeholderInput: '#585858',
        menuBackground: '#161616',
        primaryButton: '#4F75FF',

      },
    },
  },
  plugins: [],
}

