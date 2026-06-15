import {
  Bars3BottomLeftIcon,
  RectangleStackIcon,
  SparklesIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

// What kind of Shopify resource feeds a slot. Drives the icon + the "how to
// create it" copy shown to the merchant.
export type SlotKind = "collection" | "menu" | "recommendations";

const kindMeta: Record<
  SlotKind,
  { icon: typeof RectangleStackIcon; noun: string; how: string }
> = {
  collection: {
    icon: RectangleStackIcon,
    noun: "collection",
    how: "In Shopify admin → Products → Collections, create a collection and set its handle (Search engine listing → Edit) to the key above, then add products to it.",
  },
  menu: {
    icon: Bars3BottomLeftIcon,
    noun: "navigation menu",
    how: "In Shopify admin → Online Store → Navigation, create a menu whose handle matches the key above, then add the links/collections you want shown here.",
  },
  recommendations: {
    icon: SparklesIcon,
    noun: "product recommendations",
    how: "Shopify builds these automatically from your catalog. They appear once this product is connected to others (same collection, bought-together history, etc.).",
  },
};

/**
 * A labelled placeholder rendered in place of a data-driven slot (a product
 * row, carousel, promo grid or menu) when its Shopify source is empty.
 *
 * Its whole job is to make the *key* visible — e.g. `hidden-homepage-carousel`
 * — so the merchant knows exactly what to create in Shopify admin to fill the
 * slot. Once the matching collection/menu exists and has content, the real
 * component renders instead and this disappears.
 */
export function SlotPlaceholder({
  shopifyKey,
  label,
  description,
  kind = "collection",
  connected = false,
  layout = "row",
}: {
  /** The exact Shopify handle/menu key the merchant must create. */
  shopifyKey: string;
  /** Human-friendly name of the slot, e.g. "Trending carousel". */
  label: string;
  /** One line describing what shows up here once it's populated. */
  description: string;
  kind?: SlotKind;
  /** Whether a Shopify store is connected (changes the lead-in copy). */
  connected?: boolean;
  /** "row" = full-width skeleton tiles; "inline" = slim single-line hint. */
  layout?: "row" | "inline";
}) {
  const meta = kindMeta[kind];
  const Icon = meta.icon;

  const lead = connected
    ? `This ${meta.noun} isn't set up yet.`
    : `Connect your store, then add this ${meta.noun}.`;

  if (layout === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-dashed border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        <Icon className="h-4 w-4 flex-none text-primary" />
        <span>{label} →</span>
        <code className="rounded bg-background px-1.5 py-0.5 font-mono text-[11px] font-medium text-foreground">
          {shopifyKey}
        </code>
        <span className="hidden sm:inline">· {description}</span>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 py-8">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-muted-foreground/70">
          {label}
        </h2>
        <span className="rounded-full border border-dashed border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Empty slot
        </span>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-muted/40 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Icon className="h-6 w-6 flex-none text-primary" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{lead}</p>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">Shopify key:</span>
              <code className="rounded bg-background px-2 py-1 font-mono text-[12px] font-semibold text-foreground ring-1 ring-border">
                {shopifyKey}
              </code>
            </div>

            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground">
              {meta.how}
            </p>
          </div>
        </div>

        {/* Greyed skeleton tiles so the merchant sees the shape this slot will
            take once it's filled. */}
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-lg border border-border/60 bg-card/40 p-3"
            >
              <div className="flex aspect-square items-center justify-center rounded-md bg-muted">
                <Squares2X2Icon className="h-7 w-7 text-muted-foreground/40" />
              </div>
              <div className="h-2.5 w-3/4 rounded bg-muted" />
              <div className="h-2.5 w-1/2 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
