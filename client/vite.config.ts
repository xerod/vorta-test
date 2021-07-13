import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Pages({
      react: true,
    }),
    reactRefresh(),
  ],
});
