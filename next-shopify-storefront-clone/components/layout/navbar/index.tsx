import { HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { SlotPlaceholder } from "components/slot-placeholder";
import { getMenu, isShopifyConfigured } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

const HEADER_MENU_HANDLE = "next-js-frontend-header-menu";

export async function Navbar() {
  const menu = await getMenu(HEADER_MENU_HANDLE);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      {/* Main header */}
      <div className="mx-auto flex max-w-(--breakpoint-2xl) items-center gap-4 px-4 py-3.5">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu
              menu={menu}
              menuKey={HEADER_MENU_HANDLE}
              connected={isShopifyConfigured}
            />
          </Suspense>
        </div>

        <Link
          href="/"
          prefetch={true}
          className="flex flex-none items-center gap-2.5"
        >
          <LogoSquare />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {SITE_NAME}
          </span>
        </Link>

        <div className="hidden flex-1 justify-center px-4 md:flex">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>

        <div className="ml-auto flex flex-none items-center gap-1 md:ml-0">
          <Link
            href="/search"
            aria-label="Account"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-primary sm:flex"
          >
            <UserIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/search"
            aria-label="Wishlist"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted hover:text-primary sm:flex"
          >
            <HeartIcon className="h-5 w-5" />
          </Link>
          <CartModal />
        </div>
      </div>

      {/* Category navigation — driven by the Shopify header menu. When that
          menu is empty we show an inline hint with the key to create. */}
      {menu.length ? (
        <nav className="border-t border-border">
          <ul className="mx-auto flex max-w-(--breakpoint-2xl) items-center gap-7 overflow-x-auto px-4 py-2.5 text-sm font-medium">
            {menu.map((item: Menu) => (
              <li key={item.title} className="flex-none">
                <Link
                  href={item.path}
                  prefetch={true}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <nav className="border-t border-border">
          <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-2">
            <SlotPlaceholder
              layout="inline"
              kind="menu"
              shopifyKey={HEADER_MENU_HANDLE}
              label="Category nav"
              description="links from this Shopify menu show here"
              connected={isShopifyConfigured}
            />
          </div>
        </nav>
      )}
    </header>
  );
}
