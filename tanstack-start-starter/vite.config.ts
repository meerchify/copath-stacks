import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Inside the CoPath sandbox the dev server is served under a path prefix
// (…/vproxy/<port>), passed in as COPATH_BASE_PATH. Vite serves routes + assets
// under `base`. Empty in local dev / production → a normal root-served app.
const base = process.env.COPATH_BASE_PATH
  ? `${process.env.COPATH_BASE_PATH.replace(/\/$/, "")}/`
  : "/"

const config = defineConfig({
  base,
  resolve: { tsconfigPaths: true },
  server: { host: true, port: 4000, allowedHosts: true },
  plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()],
})

export default config
