// vite.config.js
import { sentryVitePlugin } from "file:///D:/react-projects/Storino/motkaml-dashboard-for-store/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { defineConfig } from "file:///D:/react-projects/Storino/motkaml-dashboard-for-store/node_modules/vite/dist/node/index.js";
import react from "file:///D:/react-projects/Storino/motkaml-dashboard-for-store/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  base: "https://dash.motkaml.com/",
  plugins: [react(), sentryVitePlugin({
    org: "abdelhamed-7w",
    project: "javascript-react"
  })],
  build: {
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxyZWFjdC1wcm9qZWN0c1xcXFxTdG9yaW5vXFxcXG1vdGthbWwtZGFzaGJvYXJkLWZvci1zdG9yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccmVhY3QtcHJvamVjdHNcXFxcU3Rvcmlub1xcXFxtb3RrYW1sLWRhc2hib2FyZC1mb3Itc3RvcmVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3JlYWN0LXByb2plY3RzL1N0b3Jpbm8vbW90a2FtbC1kYXNoYm9hcmQtZm9yLXN0b3JlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gXCJAc2VudHJ5L3ZpdGUtcGx1Z2luXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogJ2h0dHBzOi8vZGFzaC5tb3RrYW1sLm9ubGluZS8nLFxyXG5cclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgc2VudHJ5Vml0ZVBsdWdpbih7XHJcbiAgICBvcmc6IFwiYWJkZWxoYW1lZC03d1wiLFxyXG4gICAgcHJvamVjdDogXCJqYXZhc2NyaXB0LXJlYWN0XCJcclxuICB9KV0sXHJcblxyXG4gIGJ1aWxkOiB7XHJcbiAgICBzb3VyY2VtYXA6IHRydWVcclxuICB9XHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VixTQUFTLHdCQUF3QjtBQUMxWCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBRU4sU0FBUyxDQUFDLE1BQU0sR0FBRyxpQkFBaUI7QUFBQSxJQUNsQyxLQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsRUFDWCxDQUFDLENBQUM7QUFBQSxFQUVGLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxFQUNiO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
