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
    },
  },
  plugins: [],
}

