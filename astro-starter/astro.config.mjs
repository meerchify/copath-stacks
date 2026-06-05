// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

// Inside the CoPath sandbox the dev server is served under a path prefix
// (…/vproxy/<port>), passed in as COPATH_BASE_PATH. Astro serves routes + assets
// under `base`; the Vite dev server must also accept the sandbox host. Empty in
// local dev / production → a normal root-served app.
const basePath = process.env.COPATH_BASE_PATH?.replace(/\/$/, "") || undefined

// https://astro.build/config
export default defineConfig({
  base: basePath,
  server: { host: true, port: 4321 },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
  integrations: [react()],
})
