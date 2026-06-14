import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

// https://env.t3.gg/docs/nextjs
export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: z.url(),
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN: z.string(),
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION: z.string(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION,
  },
});
