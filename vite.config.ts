//https://ui.shadcn.com/docs/installation/vite

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  // base: "https://s3-gtm.s3pd12.sbercloud.ru/sl-app/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

