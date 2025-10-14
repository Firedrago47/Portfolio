module.exports = {
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        alata: ["var(--font-alata)", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
};
