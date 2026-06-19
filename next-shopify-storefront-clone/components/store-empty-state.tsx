// Shown on the homepage when no products load — i.e. the store isn't connected
// yet (no Shopify credentials). Guides the user to the Codrafts env panel instead
// of leaving a blank page. Disappears automatically once products are returned.
export function StoreEmptyState() {
  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-2 pb-12">
      <div className="rounded-2xl border border-dashed border-border bg-muted/50 p-8 text-center sm:p-12">
        <h2 className="text-xl font-semibold text-foreground">
          Connect your store to load products
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          This starter is running in demo mode. Add your Shopify Storefront API
          credentials and the grid below fills with your real catalog — no code
          changes needed.
        </p>
        <div className="mx-auto mt-6 max-w-md rounded-xl border border-border bg-card p-4 text-left">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            In Codrafts: App Details → Publish → Environment variables
          </p>
          <ul className="space-y-1 font-mono text-xs text-card-foreground">
            <li>SHOPIFY_STORE_DOMAIN = your-store.myshopify.com</li>
            <li>SHOPIFY_STOREFRONT_ACCESS_TOKEN = ••••••••</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
