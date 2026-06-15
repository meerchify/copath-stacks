import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  const eyebrow = product.vendor || product.productType;

  return (
    <>
      <div className="pb-6">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {product.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Price
            className="text-3xl font-semibold text-foreground"
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            currencyCodeClassName="hidden"
          />
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              product.availableForSale
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                product.availableForSale ? "bg-primary" : "bg-muted-foreground"
              }`}
            />
            {product.availableForSale ? "In stock" : "Out of stock"}
          </span>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <VariantSelector
          options={product.options}
          variants={product.variants}
        />
        <AddToCart product={product} />
      </div>

      {product.descriptionHtml ? (
        <details className="mt-6 border-t border-border pt-5" open>
          <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
            Description
          </summary>
          <Prose
            className="mt-3 text-sm leading-relaxed text-muted-foreground"
            html={product.descriptionHtml}
          />
        </details>
      ) : null}
    </>
  );
}
