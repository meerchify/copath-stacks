import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import { Hero } from "components/hero";
import Footer from "components/layout/footer";
import { StoreEmptyState } from "components/store-empty-state";
import { getCollectionProducts } from "lib/shopify";

export const metadata = {
  description:
    "A fast, modern universal storefront built with Next.js — products, search, cart & checkout.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  // The featured collection drives the homepage grid. When the store isn't
  // connected yet (no credentials) this returns [], so we show a friendly
  // empty state instead of a blank page.
  const featured = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });
  const hasProducts = featured.length >= 3;

  return (
    <>
      <Hero />
      {hasProducts ? (
        <>
          <ThreeItemGrid />
          <Carousel />
        </>
      ) : (
        <StoreEmptyState />
      )}
      <Footer />
    </>
  );
}
