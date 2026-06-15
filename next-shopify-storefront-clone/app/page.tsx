import { AboutStore } from "components/about-store";
import { Hero } from "components/hero";
import Footer from "components/layout/footer";
import { ProductCarousel } from "components/product-carousel";
import { ProductRow } from "components/product-row";
import { PromoTiles } from "components/promo-tiles";
import { StoreEmptyState } from "components/store-empty-state";
import {
  getCollectionProducts,
  getCollections,
  getProducts,
  isShopifyConfigured,
} from "lib/shopify";

export const metadata = {
  description:
    "A fast, modern bookstore built with Next.js — thousands of titles, instant search, cart & secure checkout.",
  openGraph: {
    type: "website",
  },
};

// Each homepage section maps 1:1 to a Shopify collection handle (the "key").
// Create a collection with the matching handle in Shopify admin and the section
// fills with its products; until then the section shows a SlotPlaceholder that
// surfaces the key so you know exactly what to create.
const HOMEPAGE_COLLECTIONS = {
  featured: "hidden-homepage-featured-items",
  carousel: "hidden-homepage-carousel",
  newArrivals: "hidden-homepage-new-arrivals",
  bestsellers: "hidden-homepage-bestsellers",
} as const;

export default async function HomePage() {
  const [featured, carousel, newArrivals, bestsellers, all, collections] =
    await Promise.all([
      getCollectionProducts({ collection: HOMEPAGE_COLLECTIONS.featured }),
      getCollectionProducts({ collection: HOMEPAGE_COLLECTIONS.carousel }),
      getCollectionProducts({ collection: HOMEPAGE_COLLECTIONS.newArrivals }),
      getCollectionProducts({ collection: HOMEPAGE_COLLECTIONS.bestsellers }),
      getProducts({}),
      getCollections(),
    ]);

  const connected = isShopifyConfigured;
  const catalog = all.slice(0, 10);

  return (
    <>
      <Hero />

      {/* Curated homepage sections — each backed by a Shopify collection key.
          Empty ones render a placeholder telling the merchant which collection
          to create in admin. */}
      <ProductRow
        title="New Books"
        subtitle="Discover the latest stories and fresh releases."
        viewAllLabel="View All Books"
        products={newArrivals}
        shopifyKey={HOMEPAGE_COLLECTIONS.newArrivals}
        description="Your latest products, showcased in a row."
        connected={connected}
      />

      <ProductRow
        title="Bestselling Books"
        subtitle="Discover the stories everyone's talking about."
        viewAllLabel="View All Books"
        products={bestsellers}
        shopifyKey={HOMEPAGE_COLLECTIONS.bestsellers}
        description="Your best-selling products, showcased in a row."
        connected={connected}
      />

      <ProductRow
        title="Biggest Discounts"
        subtitle="Unbeatable deals you don't want to miss."
        viewAllLabel="View All Deals"
        products={featured}
        shopifyKey={HOMEPAGE_COLLECTIONS.featured}
        description="Hand-picked products to spotlight — great for a sale or promotion."
        connected={connected}
      />

      {/* Promo tiles from the store's real collections. */}
      <PromoTiles collections={collections} connected={connected} />

      <ProductCarousel
        title="You May Be Interested In"
        subtitle="Recommendations for every reader."
        viewAllLabel="View All Books"
        products={carousel}
        shopifyKey={HOMEPAGE_COLLECTIONS.carousel}
        description="A horizontally-scrolling carousel of recommended products."
        connected={connected}
      />

      {/* Always-on catalog row: real products when the store has any, otherwise
          the connect-your-store hint. Not keyed — this is the whole catalog. */}
      {catalog.length ? (
        <ProductRow
          title="Browse the Catalog"
          subtitle="Everything in the store, in one place."
          products={catalog}
        />
      ) : (
        <StoreEmptyState />
      )}

      <AboutStore />
      <Footer />
    </>
  );
}
