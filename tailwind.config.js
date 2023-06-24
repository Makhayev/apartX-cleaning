/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Flex, sans-serif",
    },
    colors: {
      dark: "#030602",
      white: "#FFFFFF",
      primaryBlue: "#1195FF",
      gray: "#808080",
      lightGray: "#D3D3D3",
      red: "#FF0000",
    },
    fontSize: {
      Thin16: [
        "1rem",
        {
          lineHeight: "1.25rem",
          fontWeight: "200",
        },
      ],
      Thin20: [
        "1.25rem",
        {
          lineHeight: "1.5rem",
          fontWeight: "200",
        },
      ],
      Thin40: [
        "2.5rem",
        {
          lineHeight: "3rem",
          fontWeight: "200",
        },
      ],
      Regular10: [
        "0.625rem",
        {
          lineHeight: ".75rem",
          fontWeight: "400",
        },
      ],
      Regular11: [
        "0.6875rem",
        {
          lineHeight: "1rem",
          fontWeight: "400",
        },
      ],
      Regular12: [
        "0.75rem",
        {
          lineHeight: "1rem",
          fontWeight: "400",
        },
      ],
      Regular14: [
        "0.875rem",
        {
          lineHeight: "1rem",
          fontWeight: "400",
        },
      ],
      Regular16: [
        "1rem",
        {
          lineHeight: "1.25rem",
          fontWeight: "400",
        },
      ],
      Medium12: [
        "0.75rem",
        {
          lineHeight: "1rem",
          fontWeight: "500",
        },
      ],
      Medium14: [
        "0.875rem",
        {
          lineHeight: "1rem",
          fontWeight: "500",
        },
      ],
      Medium16: [
        "1rem",
        {
          lineHeight: "1.25rem",
          fontWeight: "500",
        },
      ],
      Semibold11: [
        "0.6875rem",
        {
          lineHeight: "1rem",
          fontWeight: "600",
        },
      ],
      Semibold12: [
        "0.75rem",
        {
          lineHeight: "1rem",
          fontWeight: "600",
        },
      ],
      Bold11: [
        "0.6875rem",
        {
          lineHeight: "1rem",
          fontWeight: "700",
        },
      ],
      Bold12: [
        "0.75rem",
        {
          lineHeight: "1rem",
          fontWeight: "700",
        },
      ],
      Bold14: [
        "0.875rem",
        {
          lineHeight: "1rem",
          fontWeight: "700",
        },
      ],
      Bold16: [
        "1rem",
        {
          lineHeight: "1.25rem",
          fontWeight: "700",
        },
      ],
      Bold20: [
        "1.25rem",
        {
          lineHeight: "1.5rem",
          fontWeight: "700",
        },
      ],
      Bold24: [
        "1.5rem",
        {
          lineHeight: "1.75rem",
          fontWeight: "700",
        },
      ],
      Bold32: [
        "2rem",
        {
          lineHeight: "normal",
          fontWeight: "700",
        },
      ],
    },
    extend: {
      animation: {
        fadeIn: "fadeIn 0.4s ease-in-out",
        fadeOut: "fadeOut 0.4s ease-in-out",
        modalOpen: "modalOpen 0.4s ease-in-out",
        modalClose: "modalClose 0.4s ease-in-out",
      },

      keyframes: () => ({
        modalOpen: {
          "0%": { top: "100vh" },
          "100%": { top: 0 },
        },
        modalClose: {
          "0%": { top: 0 },
          "100%": { top: "100vh" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      }),
      lineHeight: {
        3.5: "0.875rem",
      },
      height: {
        15: "3.75rem",
        28: "7rem",
        27: "6.75rem",
        26: "6.5rem",
        25: "6.25rem",
        5.5: "1.375rem",
        inherit: "inherit",
      },
      width: {
        35: "8.75rem",
        37: "9.25rem",
        25: "6.25rem",
        31: "7.75rem",
        23: "5.75rem",
        13: "3.25rem",
        5.5: "1.375rem",
        message: "15.625rem",
      },
      minWidth: {
        4: "1rem",
        6: "1.5rem",
      },
      minHeight: {
        4: "1rem",
        6: "1.5rem",
        12: "3rem",
        15: "3.75rem",
      },
      maxHeight: {
        half: "50%",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
