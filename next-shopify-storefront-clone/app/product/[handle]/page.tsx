import Footer from "components/layout/footer";
import { ProductCard } from "components/product-card";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { Reviews } from "components/product/reviews";
import { SectionHeading } from "components/section-heading";
import { SlotPlaceholder } from "components/slot-placeholder";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import {
  getProduct,
  getProductRecommendations,
  isShopifyConfigured,
} from "lib/shopify";
import type { Image } from "lib/shopify/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          <Link
            href="/search"
            className="transition-colors hover:text-foreground"
          >
            Shop
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <div className="w-full basis-full lg:basis-3/5">
            <div className="overflow-hidden rounded-2xl border border-border bg-muted/30 p-3 sm:p-4">
              <Suspense
                fallback={
                  <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-xl" />
                }
              >
                <Gallery
                  images={product.images.slice(0, 5).map((image: Image) => ({
                    src: image.url,
                    altText: image.altText,
                  }))}
                />
              </Suspense>
            </div>
          </div>

          <div className="basis-full lg:basis-2/5">
            <div className="lg:sticky lg:top-28">
              <Suspense fallback={null}>
                <ProductDescription product={product} />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Reviews />
        </div>

        <RelatedProducts id={product.id} />
      </div>

      <Footer />
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) {
    return (
      <SlotPlaceholder
        kind="recommendations"
        shopifyKey="productRecommendations (automatic)"
        label="You Might Also Like"
        description="Related products Shopify recommends for this item appear here."
        connected={isShopifyConfigured}
      />
    );
  }

  return (
    <div className="pt-16">
      <SectionHeading
        title="You might also like"
        subtitle="More products picked for you."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {relatedProducts.slice(0, 5).map((product) => (
          <ProductCard key={product.handle} product={product} />
        ))}
      </div>
    </div>
  );
}
