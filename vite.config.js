import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://dash.motkaml.com/',

  plugins: [react(), sentryVitePlugin({
    org: "abdelhamed-7w",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
})