/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        todoBg: "url(assets/todo.jpg)",
        postBg: "url(assets/post.jpg)"
      },
      animation: {
        fade: 'fadeOut 5s linear', // Bisa pakai ease-in-out juga untuk gantinya linear
      },
      keyframes: {
        fadeOut: {
          '0%': { top: "0px" },
          '5%': { top: "80px" },
          '10%': { top: "80px" },
          '20%': { top: "80px" },
          '30%': { top: "80px" },
          '40%': { top: "80px" },
          '50%': { top: "80px" },
          '60%': { top: "80px" },
          '70%': { top: "80px" },
          '80%': { top: "80px" },
          '90%': { top: "80px" },
          '95%': { top: "80px" },
          '100%': { top: "0px" },
        }
      }
    },
  },
  plugins: [],
}

