# Natsuzolab

> Portfolio website for composer Shun Narita (Natsuzolab).

[🔗 Live Site](https://www.natsuzolab.com/)

## ✨ Features

- 🎼 Discography showcase with YouTube embeds
- 🎬 Works portfolio (anime / game / drama soundtracks)
- 📰 Latest news feed
- 📱 Responsive layout

## 🛠 Tech Stack

- Next.js (App Router) + React + TypeScript
- Swiper for the works carousel
- Google Analytics

## 🚀 Development

```bash
npm install
npm run contentful-typescript-codegen  # generates @types/generated/contentful.d.ts
npm run dev
```

`npm run build` runs the codegen first (`prebuild`), then `next build`.
Other checks: `npm run lint`, `npm run type-check`, `npm run lint:style`.

## 🔑 Environment variables

Put these in `.env.local` for local work and in the Vercel project settings for deploys.
Never commit the values.

| Name                                     | Used for                                                      |
| ---------------------------------------- | ------------------------------------------------------------- |
| `CONTENTFUL_SPACE_ID`                    | Contentful space, for both content fetching and codegen       |
| `CONTENTFUL_CONTENT_API_ACCESS_TOKEN`    | Content Delivery API token, read at build and on revalidation |
| `CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN` | Management API token, used only by the type codegen           |
| `CONTENTFUL_ENVIRONMENT`                 | Contentful environment for the codegen (e.g. `master`)        |
| `NODEMAILER_AUTH_USER`                   | Gmail account that sends and receives contact form mail       |
| `NODEMAILER_AUTH_PASS`                   | App password for that Gmail account                           |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`          | Google Analytics measurement ID                               |

## 📝 Content (Contentful)

News, works, discography and the profile's work list are Contentful entries.
Pages revalidate every hour, so edits show up within an hour without a redeploy.

The TypeScript types for the content model are generated from Contentful into
`@types/generated/contentful.d.ts` (git-ignored). After changing the content model,
run the codegen again. CI has no Contentful secrets, so it copies a hand-written stub,
`.github/stubs/contentful.d.ts`, into that path before lint and type-check; update the
stub when the fields the code reads change.

## 📄 License

MIT
