import Link from "next/link";

// "About Store" block shown near the bottom of the homepage. Edit the copy for
// your brand. Fully token-based so theme presets re-skin it.
export function AboutStore() {
  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 py-12">
      <div className="rounded-2xl border border-border bg-muted/40 p-8 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          About Store
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Build Your Perfect Bookstore
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Welcome to our bookstore — your destination for stories that inform,
            inspire and entertain. We curate thousands of titles across every
            genre, from timeless classics to the freshest releases, all in one
            place.
          </p>
          <p>
            Whether you prefer the feel of a paper book, the convenience of an
            ebook, or the company of an audiobook on your commute, we have a
            format for every reader. Fast, free shipping on orders over $50 and
            a no-hassle returns policy mean you can shop with confidence.
          </p>
        </div>
        <Link
          href="/search"
          prefetch={true}
          className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Read More About Us
        </Link>
      </div>
    </section>
  );
}
