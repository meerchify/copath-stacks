import { graphql } from "@/lib/graphql";
import { storefront } from "@/lib/storefront";
import { invariant } from "@esmate/utils";
import { truncate } from "@esmate/utils/lodash";
import { titleize } from "@esmate/utils/string";

export async function getProductSingle(handle: string) {
  const ProductSingleQuery = graphql(`
    query ProductSingle($handle: String!) {
      product(handle: $handle) {
        title
        description(truncateAt: 256)
        seo {
          title
          description
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 250) {
          nodes {
            id
            url(transform: { maxHeight: 600 })
            altText
            width
            height
          }
        }
        options(first: 250) {
          id
          name
          values
        }
        variants(first: 250) {
          nodes {
            id
            availableForSale
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              id
            }
          }
        }
      }
    }
  `);

  const { data } = await storefront.query(ProductSingleQuery, {
    handle,
  });

  invariant(data?.product, "product is not available");

  const { seo, title, description } = data.product;

  return {
    ...data.product,
    seo: {
      title: titleize(seo.title || title),
      description: seo.description || truncate(description, { length: 256 }),
    },
  };
}
