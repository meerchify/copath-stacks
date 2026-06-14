"use client";

import { CartProvider, ShopifyProvider } from "@shopify/hydrogen-react";
import { env } from "@/lib/env";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <ShopifyProvider
      languageIsoCode="EN"
      countryIsoCode="US"
      storeDomain={env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}
      storefrontToken={env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN}
      storefrontApiVersion={env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}
    >
      <CartProvider>{props.children}</CartProvider>
    </ShopifyProvider>
  );
}
