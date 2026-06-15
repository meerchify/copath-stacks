import Link from "next/link";

// Calm, spacious hero in the modern "AI-studio" style: a soft bordered panel,
// big tight headline, muted subtitle, one primary action. No saturated
// full-bleed gradient — just generous whitespace and a faint accent glow.
// Fully token-based, so theme/font presets re-skin it. Edit copy for your brand.
export function Hero() {
  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-8 sm:pt-10">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-muted/40 px-6 py-20 sm:px-12 md:py-28">
        {/* faint accent glow, derived from the primary token */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            New arrivals every week
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Everything you need, in one place
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            A fast, modern store — browse the full catalog, search instantly,
            and check out securely in seconds.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/search"
              prefetch={true}
              className="inline-flex h-11 items-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              Shop the collection
            </Link>
            <Link
              href="/search"
              prefetch={true}
              className="inline-flex h-11 items-center rounded-full border border-border bg-background px-7 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Browse categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
