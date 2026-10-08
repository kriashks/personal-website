# adarshkrishnan.com

Personal website: writing and photography. SvelteKit, prerendered to GitHub Pages, content in Sanity.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev -- --open
```

`.env.example` sets `PUBLIC_SANITY_SAMPLE=1`, which builds with bundled sample content (placeholder photographs). Set it to `0` to build from Sanity.

## Content

Content is edited in Sanity Studio (`studio-personal-website/`):

```bash
cd studio-personal-website
npm install
npm run dev        # http://localhost:3333
```

Document types: Site settings, About page, Blog posts, Photo albums (each with photos and EXIF fields).

### First-time setup

1. `npx sanity login` with the account that owns project `xsttrmdn`.
2. In [sanity.io/manage](https://www.sanity.io/manage) create an **Editor** API token and put it in `.env` as `SANITY_WRITE_TOKEN`.
3. The dataset was seeded on 2026-10-08. `scripts/seed-sanity.mjs` remains as a reference for bulk imports (it reads markdown from `content/blog/`, which has since been removed).
4. Add albums and photos in the Studio.
5. `cd studio-personal-website && npm run deploy` redeploys the Studio at https://adarshkrishnan.sanity.studio.

### Rebuild on publish

The GitHub Actions workflow listens for `repository_dispatch` events of type `sanity-publish`.

1. Create a GitHub fine-grained personal access token with **Contents: read and write** on this repo.
2. In Sanity manage, add a webhook: URL `https://api.github.com/repos/<owner>/<repo>/dispatches`, method `POST`, trigger on create/update/delete, HTTP headers `Authorization: Bearer <token>`, `Accept: application/vnd.github+json`, and body `{"event_type":"sanity-publish"}` (projection: `{"event_type":"sanity-publish"}`).

Every publish in the Studio then rebuilds and redeploys the site.

## Share new posts on LinkedIn

Each post has a "Share on LinkedIn" toggle and an optional post text in the Studio. After every deploy, the `share-linkedin` workflow job posts any flagged post that has not been shared yet, then stamps "Shared at" on it so it never goes out twice. Clear "Shared at" to share again.

One-time setup:

1. Create a free app at https://www.linkedin.com/developers/apps. Under Products add **Share on LinkedIn** and **Sign In with LinkedIn using OpenID Connect**. Under Auth add `http://localhost:8765/callback` as a redirect URL.
2. Mint a token with a web login (tokens last about 60 days; rerun this when the job reports a 401):

```bash
LINKEDIN_CLIENT_ID=... LINKEDIN_CLIENT_SECRET=... node scripts/linkedin-auth.mjs
```

3. Add two repository secrets under Settings > Secrets and variables > Actions: `LINKEDIN_ACCESS_TOKEN` (from step 2) and `SANITY_WRITE_TOKEN` (an Editor token from sanity.io/manage, used to stamp "Shared at").

Without those secrets the job skips quietly. Test locally without posting:

```bash
DRY_RUN=1 node scripts/share-linkedin.mjs
```

## Deploy

Push to `main`. The workflow builds with `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` from repository variables (defaults to `xsttrmdn` / `production`).
