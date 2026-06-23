# Codrafts Shopify Components

Curated, **token-driven** Liquid section library for the `shopify-theme` builder. Each
component is dropped into a project via the App Details "+ / drag-and-drop" palette or by the
agent (`shopify_add_section`). Components never hardcode colors/fonts — they read the CSS
custom properties emitted from theme settings (`var(--color-accent)`, `var(--font-heading--family)`,
`var(--style-border-radius-cards)`, …), so the active **design system** restyles them
automatically.

## Layout

```
<category>/<id>/
  section.liquid   # markup + scoped {% stylesheet %} + {% schema %} with presets
  meta.json        # builder metadata (see below)
snippets/          # shared deps copied alongside a component when missing
```

## meta.json

| field        | meaning |
|--------------|---------|
| `id`         | unique kebab id |
| `name`       | display name in the palette |
| `category`   | `headers` \| `heroes` \| `content` \| `product` \| `collection` \| `footers` |
| `description`| one-liner for the palette |
| `target`     | where it may be inserted: `index` \| `page` \| `product` \| `collection` \| `header` |
| `sectionType`| filename written to `sections/<sectionType>.liquid` + `type` in the template JSON |
| `group`      | `null` for templates, `"header"`/`"footer"` to insert into a section group |
| `slot`       | `optional` (add/remove freely) or `core` (one per `coreGroup`, swapped not duplicated) |
| `snippets`   | snippet deps to copy from `snippets/` if absent in the project |
| `tags`       | search/filter keywords |
| `preset`     | object merged into the inserted section instance (`settings`, `blocks`, `block_order`) |

## Rules (enterprise)

- **Token-driven only** — zero hardcoded hex/font names. Use the CSS vars from
  `snippets/css-variables.liquid` (shipped by the starter).
- **`npx shopify theme check` clean** — 0 offenses.
- **Short kebab-ASCII names** (< 40 chars) — Shopify rejects long file/section names on upload.
- **Self-contained** — markup + styles in one file; only declared `snippets` as external deps.

## Build

`tools/build-shopify-library.mjs` scans this folder and emits the bundled
`apps/api/src/shopify/components/library.generated.ts` consumed at runtime (no network call,
versioned atomically with the API). Run after editing a component:

```
node tools/build-shopify-library.mjs
```
