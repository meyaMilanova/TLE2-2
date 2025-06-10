/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            rozeButton: '#E4A5CA',
            hoverButton: '#F8A91F',
            startButton: '#EC6426',
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
          itim: ['Itim', 'cursive'],
          klear: ['Klear', 'sans-serif'],
        },
    },
  },
  plugins: [],
}