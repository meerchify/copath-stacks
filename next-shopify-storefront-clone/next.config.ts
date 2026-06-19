export default {
  // In Codrafts the dev server is reached at <port>-<id>.e2b.app and, through the
  // branded preview proxy, at <port>-<id>.codrafts.site. Allow both as dev origins
  // (HMR/RSC) AND as Server Action origins — otherwise Next rejects the cart
  // mutations (add to cart / checkout) as cross-origin, so the cart cookie never
  // gets set and getCart() is always empty even though products load fine.
  allowedDevOrigins: ["*.e2b.app", "*.codrafts.site"],
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
    serverActions: {
      allowedOrigins: ["*.e2b.app", "*.codrafts.site"],
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};
