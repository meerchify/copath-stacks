import { ProductCard } from "components/product-card";
import { SectionHeading } from "components/section-heading";
import { SlotPlaceholder } from "components/slot-placeholder";
import type { Product } from "lib/shopify/types";

// A horizontally-scrolling product carousel (Wokiee "Trending / You may be
// interested in" style). Falls back to a SlotPlaceholder showing the Shopify
// collection key when the feeding collection is empty.
export function ProductCarousel({
  title,
  subtitle,
  products,
  href = "/search",
  viewAllLabel = "View all",
  shopifyKey,
  description,
  connected = false,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  href?: string;
  viewAllLabel?: string;
  /** The Shopify collection handle that feeds this carousel. */
  shopifyKey?: string;
  description?: string;
  connected?: boolean;
}) {
  if (!products.length) {
    if (!shopifyKey) return null;
    return (
      <SlotPlaceholder
        kind="collection"
        shopifyKey={shopifyKey}
        label={title}
        description={
          description ||
          `A scrolling carousel of products from the "${shopifyKey}" collection appears here.`
        }
        connected={connected}
      />
    );
  }

  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 py-12">
      <SectionHeading
        title={title}
        subtitle={subtitle}
        href={href}
        viewAllLabel={viewAllLabel}
      />
      <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3 [scrollbar-width:thin]">
        {products.map((product) => (
          <div
            key={product.handle}
            className="w-44 flex-none snap-start sm:w-52 lg:w-56"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
