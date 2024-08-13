/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     screens: {
      'sm': '0px',
      'md': '480px',
      'lg': '1440px',
    },
      colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'blue-light':'#5C96FC',
      'blue-dark':'#10163a' , 
      'white': '#ffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    fontFamily: {
      base: ["Cairo", "sans-serif"],
    },
    
  
  },
    
  },
  plugins: [],
}

