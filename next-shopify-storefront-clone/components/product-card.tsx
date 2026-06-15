"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

// Clean, modern product card (AI-studio style): a quiet bordered tile, image,
// optional category eyebrow, title, price, and a single round quick-add action.
// Single-variant products add straight to the cart; products with options send
// the shopper to the product page to choose first.
export function ProductCard({ product }: { product: Product }) {
  const { addCartItem } = useCart();
  const [isPending, startTransition] = useTransition();

  const eyebrow = product.vendor || product.productType;
  const singleVariant =
    product.variants.length === 1 ? product.variants[0] : undefined;
  const canQuickAdd = Boolean(singleVariant) && product.availableForSale;

  const quickAdd = () => {
    if (!singleVariant) return;
    startTransition(async () => {
      addCartItem(singleVariant, product);
      await addItem(null, singleVariant.id);
    });
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-sm">
      <Link
        href={`/product/${product.handle}`}
        prefetch={true}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        {!product.availableForSale ? (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground backdrop-blur-sm">
            Sold out
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {eyebrow ? (
          <p className="truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <Link
          href={`/product/${product.handle}`}
          prefetch={true}
          className="mt-0.5 line-clamp-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          {product.title}
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2 pt-1">
          <Price
            className="text-base font-semibold text-foreground"
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            currencyCodeClassName="hidden"
          />
          {canQuickAdd ? (
            <button
              type="button"
              onClick={quickAdd}
              disabled={isPending}
              aria-label={`Add ${product.title} to cart`}
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          ) : (
            <Link
              href={`/product/${product.handle}`}
              prefetch={true}
              aria-label={`View ${product.title}`}
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <PlusIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
