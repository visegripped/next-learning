import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
    //https://vitest.dev/config/#coverage
    exclude: [
      ...configDefaults.exclude,
      "**/next.config.mjs",
      "./my-app/app/layout.tsx",
      // '*{.,-}{config}?(-d).?(c|m)[jt]s?(x)',
    ],
  },
});
