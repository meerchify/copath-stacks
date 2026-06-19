import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

// Inside the Codrafts sandbox the dev server is served under a path prefix
// (…/vproxy/<port>), passed in as COPATH_BASE_PATH. Vite serves routes + assets
// under `base`. Empty in local dev / production → a normal root-served app.
const base = process.env.COPATH_BASE_PATH
  ? `${process.env.COPATH_BASE_PATH.replace(/\/$/, "")}/`
  : "/"

export default defineConfig({
  base,
  resolve: { tsconfigPaths: true },
  server: { host: true, port: 5173, allowedHosts: true },
  plugins: [tailwindcss(), reactRouter()],
})
