// windi.config.ts
import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: false,
  extract: {
    // accepts globs and file paths relative to project root
    include: ["src/**/*.{vue,html,jsx,js,ts,tsx}"],
  },
  plugins: [require("windicss/plugin/line-clamp")],
});
