module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
};
