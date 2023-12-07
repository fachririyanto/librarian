/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        'app-primary': '#3081D0',
        'app-black': '#333',
      },
      fontFamily: {
        body: [
          '"Inter"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

