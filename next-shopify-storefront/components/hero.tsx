import Link from "next/link";

// Universal store hero. Always renders (even before a store is connected) so the
// landing page reads like a real shop. Uses brand tokens (see globals.css) so a
// theme preset re-skins it. Edit the copy / CTAs for your brand.
export function Hero() {
  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-6 pb-2">
      <div className="from-muted to-background relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br px-6 py-16 sm:px-12 md:py-24">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            New season
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Everything you need, in one store.
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
            A fast, modern storefront — curated products, instant search, and a
            frictionless cart &amp; checkout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/search"
              prefetch={true}
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Shop all products
            </Link>
            <Link
              href="/search"
              prefetch={true}
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Browse collections
            </Link>
          </div>
        </div>
        <div className="bg-muted pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-60 blur-3xl" />
      </div>
    </section>
  );
}
