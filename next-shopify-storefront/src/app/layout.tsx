import type { Metadata } from "next";
import { ReactNode } from "react";
import { Header } from "./header";
import TopLoader from "nextjs-toploader";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next Shopify Storefront",
    template: "%s • Next Shopify Storefront",
  },
  description:
    "A modern Shopping Cart built with ESMate, Next.js, React.js, ShadCN, ESLint, Prettier, GraphQL, and Shopify Hydrogen.",
};

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <html lang="en" className="light">
      <body>
        <TopLoader color="orange" />
        <Providers>
          <Header />
          <main className="mx-auto max-w-7xl p-6 lg:px-8">{props.children}</main>
        </Providers>
      </body>
    </html>
  );
}
