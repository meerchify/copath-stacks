import Footer from "components/layout/footer";
import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import Link from "next/link";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

// Presentational filter group — wire up to real product metafields/tags when
// you're ready. Kept static so the storefront reads like the Wokiee reference.
function StaticFilters() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Availability
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {["In stock", "Out of stock"].map((label) => (
            <li key={label} className="flex items-center gap-2">
              <input type="checkbox" className="accent-[var(--primary)]" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Format</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {["Paper book", "Ebook", "Audiobook"].map((label) => (
            <li key={label} className="flex items-center gap-2">
              <input type="checkbox" className="accent-[var(--primary)]" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-6">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Shop</span>
        </nav>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Shop
        </h1>
      </div>

      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 py-8 md:flex-row">
        <aside className="w-full flex-none space-y-8 md:w-60">
          <FilterList list={sorting} title="Sort by" />
          <Collections />
          <StaticFilters />
        </aside>
        <div className="min-h-screen w-full">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}
