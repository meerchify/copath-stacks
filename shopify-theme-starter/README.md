# Shopify theme starter (Codrafts)

Based on Shopify's official **[Skeleton Theme](https://github.com/Shopify/skeleton-theme)** — a
minimal, carefully structured **Online Store 2.0** theme built around theme **blocks**, with
scaffolding for every page type. Live preview runs via `shopify theme dev` (the Shopify CLI is
baked into the sandbox image). Liquid renders on Shopify's servers against a real store — so this
theme only renders once a **store is connected**.

## Connect a store (required before preview)

1. In your Shopify store admin, install the free **Theme Access** app.
2. Generate a password — it looks like `shptka_…` (scoped to `write_themes`).
3. In Codrafts → **App Details → Connect Store**, paste your store domain
   (`your-store.myshopify.com`) and the `shptka_…` password.

The Codrafts sandbox stores these as encrypted env vars and passes them to the CLI:

- `SHOPIFY_FLAG_STORE` → `--store`
- `SHOPIFY_CLI_THEME_TOKEN` → `--password`

> A token from a **custom/public app** (`shpat_…`) does **not** work here — the CLI rejects it
> with "Invalid password". You must use a **Theme Access** password (`shptka_…`).

## Theme architecture

```
assets       # Static assets (CSS, JS, images, fonts). critical.css = essential per-page CSS
blocks       # Reusable, nestable, customizable UI components (theme blocks)
config       # Global theme settings (settings_schema.json) + saved values (settings_data.json)
layout       # Top-level page wrappers (theme.liquid, password.liquid)
locales      # Translation files (en.default.json + en.default.schema.json)
sections     # Modular full-width page components with {% schema %}
snippets     # Reusable Liquid / HTML fragments (image, meta-tags, css-variables)
templates    # JSON templates combining sections per page type
```

Page types scaffolded: index, product, collection, list-collections, cart, page, blog, article,
search, 404, gift_card, password. See the
[theme architecture docs](https://shopify.dev/docs/storefronts/themes/architecture).

## Schema conventions

- **Single CSS property** → drive it with a CSS variable from a setting:
  `style="--gap: {{ block.settings.gap }}px"` + `gap: var(--gap)` in `{% stylesheet %}`.
- **Multiple CSS properties** → switch a class via a `select` setting.
- Use `{% stylesheet %}` / `{% javascript %}` tags — they dedupe even if included many times.

## Notes

- **Checkout cannot be previewed locally** — it always runs on Shopify's domain.
- `shopify theme dev` creates a hidden **development theme** on the store; Codrafts cleans it up
  on stop. Don't run with `--allow-live` unless you intend to edit the live theme.
- To remix an existing store's live theme instead of this starter, use **Import live theme**
  (runs `shopify theme pull`).

Open-sourced under the [MIT License](./LICENSE.md) (inherited from Shopify's Skeleton Theme).
