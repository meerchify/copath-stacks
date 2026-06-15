import { SectionHeading } from "components/section-heading";
import { SlotPlaceholder } from "components/slot-placeholder";
import type { Collection } from "lib/shopify/types";
import Link from "next/link";

// "Popular Collections" promo tiles (Wokiee "Popular Book Collections"). Driven
// by the store's (non-hidden) collections; when there aren't at least two it
// shows a SlotPlaceholder prompting the merchant to create collections.
//
// Tiles are fully token-based so theme presets re-skin them: most use the muted
// surface, and the final tile is highlighted in `primary` (the purple
// "Business Literature" tile in the reference).
export function PromoTiles({
  collections,
  connected = false,
}: {
  collections: Collection[];
  connected?: boolean;
}) {
  const tiles = collections
    .filter((c) => c.handle && !c.handle.startsWith("hidden"))
    .slice(0, 3);

  if (tiles.length < 2) {
    return (
      <SlotPlaceholder
        kind="collection"
        shopifyKey="any storefront collection"
        label="Popular Collections"
        description="Your store's collections appear here as promo tiles. Create at least two collections in Shopify admin to fill this grid."
        connected={connected}
      />
    );
  }

  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 py-12">
      <SectionHeading
        title="Popular collections"
        subtitle="Curated selections, handpicked for you."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((collection, i) => {
          const highlight = i === tiles.length - 1;
          return (
            <Link
              key={collection.handle}
              href={collection.path}
              prefetch={true}
              className={`group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-sm ${
                highlight
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-muted/40 text-foreground hover:border-primary/40"
              }`}
            >
              <span
                className={`text-xs font-medium uppercase tracking-wide ${
                  highlight
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                Collection
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {collection.title}
                </h3>
                <span className="mt-1 inline-flex items-center text-sm font-medium">
                  Shop now
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
