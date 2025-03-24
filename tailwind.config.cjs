const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flashDown: {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "50%": { opacity: "0.3", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(100%)" },
        },

        glitchTop: {
          "0%": { clip: "rect(0, 9999px, 0, 0)" },
          "10%": { clip: "rect(10px, 9999px, 30px, 0)", left: "2px" },
          "20%": { clip: "rect(85px, 9999px, 100px, 0)", left: "-2px" },
          "30%": { clip: "rect(50px, 9999px, 70px, 0)", left: "1px" },
          "100%": { clip: "rect(0, 9999px, 0, 0)" },
        },
        glitchBottom: {
          "0%": { clip: "rect(0, 9999px, 0, 0)" },
          "10%": { clip: "rect(60px, 9999px, 80px, 0)", left: "-1px" },
          "20%": { clip: "rect(20px, 9999px, 40px, 0)", left: "1px" },
          "30%": { clip: "rect(70px, 9999px, 90px, 0)", left: "-1px" },
          "100%": { clip: "rect(0, 9999px, 0, 0)" },
        },
        noiseAnim: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% 100%" },
        },
      },

      animation: {
        "spin-slow": "spin 8s linear infinite",
        flashDown: "flashDown 1s ease-in-out",
        glitchTop: "glitchTop 1s infinite linear alternate-reverse",
        glitchBottom: "glitchBottom 1s infinite linear alternate-reverse",
        noise: "noiseAnim 1s infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        /* Track styles */
        'input[type="range"]::-webkit-slider-runnable-track': {
          width: "100%",
          height: "3px",
          background: "#4b5563",
          "border-radius": "9999px",
        },
        'input[type="range"]::-moz-range-track': {
          width: "100%",
          height: "6px",
          background: "#4b5563",
          "border-radius": "9999px",
        },

        /* Thumb styles */
        'input[type="range"]::-webkit-slider-thumb': {
          "-webkit-appearance": "none",
          appearance: "none",
          "margin-top": "-4px",
          background: "#a855f7",
          width: "14px",
          height: "14px",
          "border-radius": "9999px",
          border: "none",
        },
        'input[type="range"]::-moz-range-thumb': {
          background: "#a855f7",
          width: "14px",
          height: "7px",
          "border-radius": "9999px",
          border: "none",
        },

        /* Hover effect OFF */
        'input[type="range"]::-webkit-slider-thumb:hover': {
          background: "#a855f7",
        },
        'input[type="range"]::-moz-range-thumb:hover': {
          background: "#a855f7",
        },
      });
    }),
  ],
};
