import { defineConfig } from "vite";
import unocss from "unocss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "web",
  plugins: [unocss(), react()],
});
