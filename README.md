# MoobangBench

Public Expo Router static site for comparing live AI coding benchmark artifacts. Community voting runs on Cloudflare Pages Functions with D1.

## Local development

Requirements: Node.js 20+, npm, and a local `.dev.vars` file containing `VOTE_SALT=dev-salt`.

```sh
npm install
npm run check:data
npm run build
npm run db:migrate:local
npm run preview:cf
```

Open `http://127.0.0.1:8788`. `npm run dev` runs the UI without Pages Functions.

## Cloudflare deployment

1. Authenticate and create the database:
   ```sh
   npx wrangler login
   npx wrangler d1 create moobangbench
   ```
2. Replace `PLACEHOLDER` in `wrangler.toml` with the returned D1 database id.
3. Apply the production schema:
   ```sh
   npm run db:migrate:remote
   ```
4. Push the repository to GitHub. In Cloudflare Pages, connect the repository with build command `npm run build` and output directory `dist`.
5. Configure the vote salt:
   ```sh
   npx wrangler pages secret put VOTE_SALT --project-name moobangbench
   ```

## Domain

Buy `moobangbench.ai` from a registrar supporting `.ai`, add the site to Cloudflare, update the registrar nameservers, then add `moobangbench.ai` and `www.moobangbench.ai` under Pages custom domains. `public/_redirects` sends `www` to the apex domain.

## AdSense

After the live domain is approved:

1. Set `EXPO_PUBLIC_ADSENSE_CLIENT` in Cloudflare Pages build environment variables.
2. Replace the placeholder publisher id in `public/ads.txt`.
3. Replace the placeholder slot ids passed to `AdSlot` in `app/_layout.tsx`, `app/benchmarks/[id].tsx`, and `app/results/[id].tsx`.
4. Enable AdSense's EU consent message in the AdSense console.

Without `EXPO_PUBLIC_ADSENSE_CLIENT`, stable-layout ad placeholders render and the AdSense script is not loaded.

## Add benchmark content

1. Copy an artifact to `public/demos/<result-id>/`. Multi-file demos are supported.
2. Add the benchmark, model, or tool to its JSON file in `src/data/` when first introduced.
3. Append the result to `src/data/results.json`.
4. Run `npm run check:data` and `npm run build`, then push. Cloudflare Pages deploys the update.

Editor scores are the one-decimal mean of functionality, code quality, polish, and performance. Leave `editorScores` as `null` until reviewed.
