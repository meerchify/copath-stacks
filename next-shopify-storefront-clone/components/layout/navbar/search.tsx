"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form
      action="/search"
      className="relative w-full max-w-[550px] lg:w-80 xl:w-full"
    >
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full rounded-full border border-border bg-background py-2.5 pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
      </button>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full max-w-[550px] lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-full border border-border bg-background py-2.5 pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground"
      />
      <div className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </div>
    </form>
  );
}
