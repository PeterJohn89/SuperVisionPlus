module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        'darkBlue': '#1a252b',
        'primayColour': '#e17a47',
        'secondaryColour': '#ef3d59',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#eeeeee',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      extend: {
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        borderRadius: {
          '4xl': '2rem',
        }
      }
    },
  },
  plugins: [],
};
