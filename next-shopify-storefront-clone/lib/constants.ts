export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Trending",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: "Latest arrivals",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";

// The storefront preview runs inside a cross-site iframe (Codrafts App Details),
// so a default SameSite=Lax cookie is blocked by the browser and the cart never
// persists. SameSite=None + Secure + Partitioned (CHIPS) lets the cart cookie
// survive in the embedded preview while staying first-party-safe in production.
// NOTE: kept here (a plain module) rather than in the "use server" actions file,
// where Next.js only allows async function exports.
export const CART_COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  sameSite: "none",
  secure: true,
  partitioned: true,
} as const;

// Shopify ships a new Storefront API version each quarter (YYYY-{01,04,07,10})
// and supports the trailing ~12 months. The old hard-coded "2023-01" is long
// past sunset, which can make Cart API mutations (cartCreate/cartLinesAdd) fail
// while product reads still work — exactly the "products load but checkout is
// unavailable" symptom. Default to a current stable version; override per store
// via the SHOPIFY_API_VERSION env var (set it in App Details → env if needed).
export const SHOPIFY_API_VERSION =
  process.env.SHOPIFY_API_VERSION || "2026-01";
export const SHOPIFY_GRAPHQL_API_ENDPOINT = `/api/${SHOPIFY_API_VERSION}/graphql.json`;
