import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import WindiCSS from "vite-plugin-windicss";
import Pages from "vite-plugin-pages";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Pages({
      react: true,
      extendRoute: (route, parent) => {
        if (route.path === "/") {
          return null;
        }

        return {
          ...route,
          meta: { auth: true },
        };
      },
      exclude: ["src/pages/*.tsx"],
    }),
    reactRefresh(),
    WindiCSS(),
  ],
  resolve: {
    alias: [
      {
        find: "components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "types",
        replacement: path.resolve(__dirname, "./src/types"),
      },
      {
        find: "libs",
        replacement: path.resolve(__dirname, "./libs"),
      },
    ],
  },
});
