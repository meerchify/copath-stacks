import type { NextConfig } from "next"

// When booted inside the CoPath sandbox the app is served under a path prefix
// (…/vproxy/<port>). The sandbox passes that prefix as COPATH_BASE_PATH; Next.js
// reads it into basePath + assetPrefix so routes and /_next assets resolve under
// the prefix. Empty in local dev / production → a normal root-served app.
const basePath = process.env.COPATH_BASE_PATH?.replace(/\/$/, "") || ""

const nextConfig: NextConfig = basePath
  ? { basePath, assetPrefix: basePath }
  : {}

export default nextConfig
