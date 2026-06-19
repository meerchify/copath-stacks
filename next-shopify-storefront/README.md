# Universal Store — Codrafts starter

A fast, server-rendered **universal storefront** built on Next.js (App Router)
and the **Shopify Storefront API**. Products, search, cart, and checkout work out
of the box — checkout runs on Shopify, so there's no backend to host.

It boots immediately in **demo mode** (no products) and turns into a real shop the
moment you connect your store. The UI uses the shared Codrafts design tokens, so the
theme and font pickers re-skin it like every other Codrafts stack.

---

## 1. Boot it

Fork the **Shopify storefront (Next.js)** starter in the Codrafts Library. The dev
preview comes up in demo mode and shows a "Connect your store" hint on the home
page — that's expected until you add credentials.

## 2. Connect your Shopify store (environment variables)

This starter reads its configuration from environment variables. In Codrafts you
add them in the app, **not** in a file:

> **App Details → Publish → Environment variables**

Add these two (set **Target** to `Development` or `All` so the live preview picks
them up):

| Variable | Value |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | your Storefront API access token |

Optional:

| Variable | Value |
| --- | --- |
| `SITE_NAME` | Store name shown in the navbar/footer/titles |
| `COMPANY_NAME` | Name used in the footer copyright |
| `SHOPIFY_REVALIDATION_SECRET` | Secret for the `/api/revalidate` webhook (on-demand ISR from Shopify) |

When you save, Codrafts writes the values into the sandbox (`.env.local`) and
**restarts the dev server automatically** — refresh the preview and your real
catalog appears. Secrets are stored encrypted and are masked when you view them
again. To take the variables to production too, set their target to `Production`
or `All` before publishing.

### Where do the Shopify credentials come from?

In Shopify admin: **Settings → Apps and sales channels → Develop apps → Create an
app**, enable the **Storefront API** scopes (read products, collections, and
checkout/cart), then copy the **Storefront API access token**. Your store domain
is the `*.myshopify.com` subdomain.

### Local dev (outside Codrafts, optional)

Copy `.env.example` to `.env.local` and fill in the same variables, then:

```bash
pnpm install
pnpm dev          # http://localhost:4000
```

## 3. Make it yours (theming)

The look is driven by design tokens in `app/globals.css` — the same shadcn token
contract the other Codrafts stacks use:

- **Theme & font pickers** in App Details restyle the store (colors, radius, font).
- **`apply_preset`** swaps the whole palette in one shot.
- Or edit the `:root { … }` / `.dark { … }` token values directly.

Dark mode is class-based (`.dark` on `<html>`, set from the OS preference by a
no-flash script in `app/layout.tsx`), so presets and `dark:` utilities both work.

Brand touch points to edit first:

- `components/icons/logo.tsx` — the shopping-bag mark (swap for your logo).
- `components/hero.tsx` — homepage hero copy & CTAs.
- `SITE_NAME` / `COMPANY_NAME` env vars — store name.

## Project structure

```
app/                     App Router routes (home, product, search, cart api)
components/
  hero.tsx               Universal store hero (always rendered)
  store-empty-state.tsx  "Connect your store" demo-mode hint
  cart/                  Cart context, modal, add/update/remove actions
  layout/                Navbar, footer, search, mobile menu
  product/               Gallery, variant selector, description
  grid/                  Product grid + homepage three-item grid + carousel
lib/shopify/             Storefront API client, queries, mutations, types
app/globals.css          Design tokens (themeable) + base layer
.copath/bootstrap.json   Codrafts boot contract (install + `next dev -p 4000`)
```

## Notes

- Without credentials the Storefront API client returns empty results instead of
  crashing, so the preview always boots — you just see the demo hero + empty state.
- Built on [vercel/commerce](https://github.com/vercel/commerce); the commerce
  components and Storefront API layer are kept, with Codrafts branding and the
  shared design-token system layered on top.
