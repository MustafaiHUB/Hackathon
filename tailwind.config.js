/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrollbarThumb: '#a3a3a3',
        scrollbarThumbHover: '#888',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        audiowide: ['Audiowide', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar': {
          /* For WebKit-based browsers */
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#a3a3a3',
            borderRadius: '10px',
            border: '2px solid transparent',
            backgroundClip: 'content-box',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#888',
          },
          /* For Firefox */
          'scrollbar-width': 'thin',
          'scrollbar-color': '#a3a3a3 transparent',
        },
      };
      addUtilities(newUtilities, ['responsive']);
    },
  ],
}

