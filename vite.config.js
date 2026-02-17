import { defineConfig } from "vite";

export default defineConfig({
  base: "/soccer-tracker/",
  server: {
    proxy: {
      "/fd": {
        target: "https://api.football-data.org",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/fd/, ""),
      },
    },
  },
});
