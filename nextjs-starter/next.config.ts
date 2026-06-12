import type { NextConfig } from "next"

// When booted under a path-prefix proxy the sandbox passes that prefix as
// COPATH_BASE_PATH; Next.js reads it into basePath + assetPrefix so routes and
// /_next assets resolve under the prefix. Empty (the E2B case, where each port
// gets its own <port>-<id>.e2b.app subdomain) → a normal root-served app.
const basePath = process.env.COPATH_BASE_PATH?.replace(/\/$/, "") || ""

const nextConfig: NextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // In the sandbox the dev server is reached at <port>-<id>.e2b.app — a
  // non-localhost origin. Next's dev server otherwise blocks cross-origin
  // requests to /_next/* (HMR, RSC payloads, JS chunks), so the client bundle
  // never loads and nothing hydrates: toggles do nothing and any element that
  // animates in (framer-motion `initial`/`animate`) stays at its hidden initial
  // state. Allow-listing the sandbox host family fixes it. Harmless locally.
  allowedDevOrigins: ["*.e2b.app"],
}

export default nextConfig
