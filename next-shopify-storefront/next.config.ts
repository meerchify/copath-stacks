export default {
  // In CoPath the dev server is reached at <port>-<id>.e2b.app and, through the
  // branded preview proxy, at <port>-<id>.copath.run. Allow both as dev origins
  // (HMR/RSC) AND as Server Action origins — otherwise Next rejects the cart
  // mutations (add to cart / checkout) as cross-origin, so the cart cookie never
  // gets set and getCart() is always empty even though products load fine.
  allowedDevOrigins: ["*.e2b.app", "*.copath.run"],
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
    serverActions: {
      allowedOrigins: ["*.e2b.app", "*.copath.run"],
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
