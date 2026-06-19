# Astro + React + TypeScript + shadcn/ui

This is a template for a new Astro project with React, TypeScript, and shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `src/components` directory.

## Pages & layout — IMPORTANT

**Every page must render through `@/layouts/main.astro`.** The layout owns the
`<html>`, `<head>`, and `<body>` tags and imports `@/styles/global.css` (Tailwind
+ the design-system tokens). If a page writes its own `<html>` instead of using
the layout, **none of the styles load** and the page renders unstyled.

Do **NOT** put raw `<html>/<head>/<body>` in a page. Wrap your content in
`<Layout>` instead — put page-specific `<title>`/meta inside the layout (extend
it with props/slots if you need per-page values).

```astro
---
import Layout from "@/layouts/main.astro"
import { Button } from "@/components/ui/button"
---

<Layout>
  <div class="grid h-screen place-items-center content-center">
    <Button>Button</Button>
  </div>
</Layout>
```

Per-page metadata, language and a body class go through props — never by writing
your own `<html>`. Extra `<head>` tags use the `head` slot, and `<script>` tags
sit inside the layout content as usual:

```astro
---
import Layout from "@/layouts/main.astro"
import Navbar from "@/components/landing/Navbar.astro"
import Hero from "@/components/landing/Hero.astro"
import Footer from "@/components/landing/Footer.astro"
---

<Layout
  title="Flowzone — Zarządzanie projektami bez chaosu"
  description="Flowzone porządkuje zadania i pokazuje, co robić dalej."
  lang="pl"
  bodyClass="min-h-screen antialiased"
>
  <Navbar />
  <main>
    <Hero />
  </main>
  <Footer />

  <script>
    // page scripts live here, inside the layout content
  </script>
</Layout>
```

## Using components

Add shadcn components with `npx shadcn@latest add button` (they land in
`src/components/ui`), then import them in any `.astro` or `.tsx` file as shown
above. Global styles come from the layout — you never need to import
`global.css` in a page yourself.
