import type { ExecutionResult } from "graphql";
import { createStorefrontClient } from "@shopify/hydrogen-react";
import type { TypedDocumentString } from "./graphql/graphql";
import { env } from "./env";

export const { getStorefrontApiUrl, getPublicTokenHeaders } = createStorefrontClient({
  storeDomain: env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  storefrontApiVersion: env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION,
  publicStorefrontToken: env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN,
});

async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch(getStorefrontApiUrl(), {
    method: "POST",
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json() as ExecutionResult<TResult>;
}

export const storefront = {
  query: execute,
  mutation: execute,
};
