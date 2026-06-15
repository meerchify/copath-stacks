import Link from "next/link";

import { FeatureBars } from "components/feature-bars";
import LogoSquare from "components/logo-square";
import { NewsletterForm } from "components/newsletter-form";
import { SlotPlaceholder } from "components/slot-placeholder";
import { getMenu, isShopifyConfigured } from "lib/shopify";
import { Menu } from "lib/shopify/types";

const { COMPANY_NAME, SITE_NAME } = process.env;

const FOOTER_MENU_HANDLE = "next-js-frontend-footer-menu";

const companyLinks = [
  { title: "About Us", path: "/search" },
  { title: "Blog", path: "/search" },
  { title: "Shipping & Returns", path: "/search" },
  { title: "Privacy Policy", path: "/search" },
  { title: "Contact Us", path: "/search" },
];

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const menu = await getMenu(FOOTER_MENU_HANDLE);
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="mt-12 border-t border-border">
      <FeatureBars />

      <div className="border-t border-border bg-muted/40">
        <div className="mx-auto grid max-w-(--breakpoint-2xl) gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <LogoSquare size="sm" />
              <span className="text-lg font-bold text-foreground">
                {SITE_NAME}
              </span>
            </Link>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              <li>123 Bookworm Avenue, Suite 100</li>
              <li>New York, NY 10001</li>
              <li className="font-medium text-foreground">(555) 555-1000</li>
              <li>hello@{(SITE_NAME || "store").toLowerCase()}.com</li>
            </ul>
          </div>

          {/* Collections (Shopify footer menu) */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Collections
            </h3>
            {menu.length ? (
              <ul className="mt-4 space-y-2 text-sm">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 space-y-3">
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/search"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      Shop all
                    </Link>
                  </li>
                </ul>
                <SlotPlaceholder
                  layout="inline"
                  kind="menu"
                  shopifyKey={FOOTER_MENU_HANDLE}
                  label="Footer links"
                  description="links from this Shopify menu show here"
                  connected={isShopifyConfigured}
                />
              </div>
            )}
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {companyLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Subscribe for Exclusive Offers
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Sign up to be the first to know about new arrivals and special
              promotions.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col items-center gap-3 px-4 py-6 text-sm text-muted-foreground md:flex-row">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <a
            className="flex h-8 w-max items-center justify-center rounded-md border border-border bg-card px-3 text-xs text-foreground md:ml-auto"
            aria-label="Built with CoPath"
            href="https://copath.app"
            target="_blank"
            rel="noreferrer"
          >
            Built with CoPath
          </a>
        </div>
      </div>
    </footer>
  );
}
