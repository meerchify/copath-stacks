import type { NextConfig } from "next"

// When booted under a path-prefix proxy the sandbox passes that prefix as
// COPATH_BASE_PATH; Next.js reads it into basePath + assetPrefix so routes and
// /_next assets resolve under the prefix. Empty (the E2B case, where each port
// gets its own <port>-<id>.e2b.app subdomain) → a normal root-served app.
const basePath = process.env.COPATH_BASE_PATH?.replace(/\/$/, "") || ""

const nextConfig: NextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // In the sandbox the dev server is reached at <port>-<id>.e2b.app and, through
  // the branded preview proxy, at <port>-<id>.copath.run — both non-localhost
  // origins. Next's dev server otherwise blocks cross-origin requests to
  // /_next/* (HMR, RSC payloads, JS chunks), so the client bundle never loads
  // and nothing hydrates. Allow-listing the sandbox host families fixes it.
  allowedDevOrigins: ["*.e2b.app", "*.copath.run"],
  // Server Actions are origin-checked: behind the preview proxy the request
  // Origin (*.copath.run) differs from the sandbox Host (*.e2b.app), so without
  // this Next rejects every action as cross-origin and form mutations (e.g. a
  // cart, auth, anything POSTing to a `"use server"` fn) silently fail.
  experimental: {
    serverActions: {
      allowedOrigins: ["*.e2b.app", "*.copath.run"],
    },
  },
}

export default nextConfig
