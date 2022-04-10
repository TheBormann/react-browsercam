module.exports = {
  content: [],
  theme: {
    extend: {
      keyframes: {
        'flash': {
          '0%': {
            opacity: '0.75'
          },
          '100%': {
            opacity: '0'
          }
        }
      },
      animation: {
        'flash': 'flash 750ms ease-out'
      }
    }
  },
  plugins: [],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ]
};
