# Shopify theme starter (Codrafts)

A minimal, valid **Online Store 2.0** Shopify theme in Liquid. Live preview runs via
`shopify theme dev` (the Shopify CLI is baked into the sandbox image). Liquid renders on
Shopify's servers against a real store — so this theme only renders once a **store is connected**.

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

## Structure

```
layout/theme.liquid        ← HTML shell ({{ content_for_header }} + {{ content_for_layout }})
templates/*.json           ← OS 2.0 JSON templates (index, product, collection, cart, page, 404)
sections/*.liquid          ← sections with {% schema %} (header, footer, hero, main-*)
config/settings_schema.json← theme settings (Customize panel)
locales/en.default.json    ← translatable strings
assets/base.css            ← styles
```

## Notes

- **Checkout cannot be previewed locally** — it always runs on Shopify's domain.
- `shopify theme dev` creates a hidden **development theme** on the store; Codrafts cleans it up
  on stop. Don't run with `--allow-live` unless you intend to edit the live theme.
- To remix an existing store's live theme instead of this starter, use **Import live theme**
  (runs `shopify theme pull`).
