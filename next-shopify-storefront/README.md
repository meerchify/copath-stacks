# 🛍 Next.js Shopify Storefront

A modern **Shopping Cart** built with [ESMate](https://github.com/VienDinhCom/esmate), Next.js, React.js, ShadCN,
ESLint, Prettier, GraphQL, and Shopify Hydrogen.

![Next.js Shopify Storefront - GitHub Repo Stars](https://img.shields.io/github/stars/maxvien/next-shopify-storefront?label=Stars)
![Next.js Shopify Storefront - GitHub forks](https://img.shields.io/github/forks/maxvien/next-shopify-storefront?label=Forks)
![Next.js Shopify Storefront - Started Years](https://img.shields.io/badge/Since-2019-blue?style=flat)

## Why?

Building an online store usually means wrestling with complicated code for days? I wanted to change that.

So I created [Next.js Shopify Storefront](https://github.com/VienDinhCom/next-shopify-storefront)—basically, it's a
starter kit that lets you build a Shopify store incredibly fast. Think of it as a foundation that's already solid, so
you can focus on what makes your store unique instead of reinventing the wheel.

Here's what I'm talking about: it uses [Next.js](https://github.com/VienDinhCom/esmate/tree/main/templates/react-next)
and [React.js](https://github.com/VienDinhCom/esmate/tree/main/templates/react-spa) for the framework,
[TailwindCSS](https://github.com/VienDinhCom/esmate/tree/main/packages/shadcn) and
[ShadCN](https://github.com/VienDinhCom/esmate/tree/main/packages/shadcn) to make things look great, and connects
directly to Shopify's backend through their
[GraphQL API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/api-exploration/graphiql-storefront-api).
The shopping cart? Built with [Shopify Hydrogen React](https://www.npmjs.com/package/@shopify/hydrogen-react).

But the part I'm most proud of is the developer experience. Everything's
configured—[ESMate](https://github.com/VienDinhCom/esmate),
[ESLint](https://github.com/VienDinhCom/esmate/tree/main/packages/eslint),
[Prettier](https://github.com/VienDinhCom/esmate/tree/main/packages/prettier),
[GraphQL Codegen](https://www.npmjs.com/package/@graphql-codegen/cli)—so the code stays clean and safe automatically.

It's not revolutionary. It's just taking what works and packaging it so you can skip the tedious setup and start
building something meaningful.

If you like this project, hit the **STAR** button to bookmark it ⭐️

## Demonstration

You can visit here to see the demo: https://next-shopify-storefront.vercel.app/

## Installation

Clone the source code into your computer.

```bash
git clone https://github.com/VienDinhCom/next-shopify-storefront.git
```

**This project was developed with Node 24 and PNPM 10.**<br>

Install the project's dependencies.

```bash
pnpm install
```

## Usage

First, you need to set the below environment variables in the `.env` file or your deployment platforms.

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION`

You can follow the [Shopify Storefront GraphQL API](https://shopify.dev/api/storefront/getting-started) documentation to
get Storefront API information.

### Develop

Develop the project in development mode.

```bash
pnpm run dev
```

### Build

Build the project in production mode.

```bash
pnpm run build
```

### Start

Start the project in production mode.

```bash
pnpm run start
```

### Lint & Format

Analyze the code to find problems with `eslint` and `prettier`.

```bash
pnpm run check
```

Automatically fix problems.

```bash
pnpm run fix
```

## Visual Studio Code Extensions

To speed up your productivity, you can install these extensions:

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [TailwindCSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Related Projects

- **[Shopify Data Faker](https://github.com/Maxvien/shopify-data-faker)** • A Shopify development tool for generating
  dummy store data.
- **[Bootstrap Shopify Theme](https://github.com/Maxvien/bootstrap-shopify-theme/tree/v1)** • A free Shopify Theme built
  with Bootstrap, BEM, Liquid, Sass, ESNext, Theme Tools, ... and Webpack.
- **[Next Shopify Storefront (v3)](https://github.com/Maxvien/next-shopify-storefront/tree/v3)** • A Shopping Cart built
  with TailwindCSS, HeadlessUI, Next.js, React.js, Shopify Hydrogen,... and Shopify Storefront GraphQL API.
- **[Next Shopify Storefront (v2)](https://github.com/Maxvien/next-shopify-storefront/tree/v2)** • A Shopping Cart built
  with TypeScript, Emotion, Next.js, React.js, React Query, Shopify Storefront GraphQL API, ... and Material UI.
- **[Next Shopify Storefront (v1)](https://github.com/Maxvien/next-shopify-storefront/tree/v1)** • A Shopping Cart built
  with TypeScript, NextJS, React, Redux, Apollo Client, Shopify Storefront GraphQL API, ... and Material UI.
