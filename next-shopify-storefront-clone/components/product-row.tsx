import { ProductCard } from "components/product-card";
import { SectionHeading } from "components/section-heading";
import { SlotPlaceholder } from "components/slot-placeholder";
import type { Product } from "lib/shopify/types";

// A titled grid of product cards used across the homepage (New Books,
// Bestselling Books, You May Be Interested In, …).
//
// When the row has no products it renders a SlotPlaceholder instead of nothing,
// so the merchant can see the section in the layout and learn which Shopify
// collection (`shopifyKey`) to create/fill to populate it.
export function ProductRow({
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
  /** The Shopify collection handle that feeds this row. */
  shopifyKey?: string;
  /** Shown in the empty-slot placeholder. */
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
          `Products from the "${shopifyKey}" collection appear here.`
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {products.map((product) => (
          <ProductCard key={product.handle} product={product} />
        ))}
      </div>
    </section>
  );
}
