/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '580px',
      md: '900px',
      lg: '1220px',
      xl: '1440px',
    },
    extend: {
      backgroundImage: {
        'galaxy': 'url(/galaxy.jpg)',
        'auth-bg': 'url(/auth-bg.jpg)'
      },
      textColor: {
        'purple': '#7a0ffe'
      }
    }
  },
  plugins: [],
}