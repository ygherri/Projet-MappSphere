/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#696FFF",
      },
      screens: {
        'md': '768px',
      },
      zIndex: {
        1000: 1000,
      },
    },
  },
  plugins: [],
};

