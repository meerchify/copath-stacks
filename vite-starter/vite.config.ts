import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Inside the CoPath sandbox the dev server is served under a path prefix
// (…/vproxy/<port>), passed in as COPATH_BASE_PATH. Vite serves routes + assets
// under `base`. Empty in local dev / production → a normal root-served app.
const base = process.env.COPATH_BASE_PATH
  ? `${process.env.COPATH_BASE_PATH.replace(/\/$/, "")}/`
  : "/"

// https://vite.dev/config/
export default defineConfig({
  base,
  // `host: true` + `allowedHosts: true` let the dev server answer requests for
  // the sandbox's public hostname (e.g. 5173-<id>.e2b.app) instead of rejecting
  // them with "Blocked request. This host is not allowed."
  server: { host: true, port: 5173, allowedHosts: true },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
