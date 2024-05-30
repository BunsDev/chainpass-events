/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#D7FC6E",
          secondary: "#B773FB",
          accent: "#D7FC6E",
          neutral: "#F9FBFF",
          "base-100": "#070707",
          "base-content": "#F8F8FF",
          info: "#385183",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",
          "--rounded-btn": "9999rem",
          "--glass-blur ": "20px",
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
