/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bluePrimary: "#008CEE",
        grayPrimary: "#262626",
        lightGrayPrimary: "#3C3C3C",
        textGray: "#A8A8A8",
        lightBlack: "rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        instaGradient:
          "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
      },
      boxShadow: {
        postShadow: "0 0 0 1px gray",
      },
    },
    screens: {
      "320": "320px",
      "480": "480px",
      "768": "768px",
      "1024": "1024px",
      "1280": "1280px",
      "1440": "1440px",
    },
  },
  plugins: [],
};
