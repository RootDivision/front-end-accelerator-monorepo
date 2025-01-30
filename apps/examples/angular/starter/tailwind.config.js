module.exports = {
  content: ["./src/**/*.{html,ts}", "./libs/ui/**/*.{html,ts}"],
  darkMode: "class",
  important: true,
  plugins: [],
  presets: [require("@spartan-ng/ui-core/hlm-tailwind-preset")],
  theme: {
    extend: {},
  },
};
