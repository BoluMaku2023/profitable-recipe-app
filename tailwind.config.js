/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./component/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      almondColor: "#F2E5D7",
      melon: "#FFBCB5",
      xiketic: "#0F1020",
      spaceCadet: "#3B3561",
      primary: "#ffffff",
      secondary: "#2e2e36",
      overlay: "rgba(0, 0, 0, 0.5)",
      bgYellow: "#ffda00",
      red: "#ff2400",

      // purrple_color-shades
      btnBg: "#bd5bfcd9",
      bgPurple: "#c773fc",
      darkPurple: "#840dce",
      darkerPurple: "#60269E",
      mauve: "#FAA6FF",
      royalPurple: "#7353BA",
      violetPurple: "#2F195F",
      purpleMountain: "#EFC3F5",
      purpleLigther: "#6E72FC",
      fade: "# #F6F6F9",

      // gray colors
      ghostWhite: "#F4F4F8",
      gainsBoro: "#F4F5F9",
      platinum: "#EBEBEA",
      grayish: "#E0E0E0",
      aquaMarine: "#3DDC97",
      dogwoodRose: "#FF0000",
    },
    extend: {
      backgroundImage: {
        "bg-index": "url('/images/indexbg.jpg')",
        "bg-pexel": "url('/images/pexels-bg-1.jpg')",
        "bg-sigup": "url('/images/bgsignup.jpg')",
      },
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
      },
      width: {
        31: "37%",
        21: "21%",
        25: "160px",
        26: "120px",
        250: "250px",
        500: "500px",
        700: "700px",
        900: "900px",
      },
      minWidth: {
        250: "250px",
        900: "900px",
      },
      maxWidth: {
        250: "500px",
        24: "96px",
        700: "700px",
        800: "800px",
      },
      strokeWidth: {
        20: "20px",
      },
      height: {
        25: "160px",
        26: "120px",
      },
      animation: {
        rotate: "rotate 2s linear forwards",
      },
      keyframes: {
        rotate: {
          "0%": { "stroke-dashoffset": 0 },
          "100%": { "stroke-dashoffset": 180 },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
