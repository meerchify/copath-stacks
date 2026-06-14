import { graphql } from "@/lib/graphql";
import { storefront } from "@/lib/storefront";
import { invariant } from "@esmate/utils";

export async function getProductList(cursor?: string) {
  const ProductListQuery = graphql(`
    query ProductList($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            handle
            title
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url(transform: { maxWidth: 500 })
              altText
              width
              height
            }
          }
        }
      }
    }
  `);

  const { data } = await storefront.query(ProductListQuery, {
    first: 12,
    after: cursor || null,
  });

  invariant(data?.products, "products are not available");

  return data.products;
}
