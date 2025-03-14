import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: import.meta.env.VITE_Dash_Site_URL,

  plugins: [react(), sentryVitePlugin({
    org: "abdelhamed-7w",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
})