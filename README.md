# MoobangBench

Expo Router static site for comparing playable AI coding benchmark artifacts. Community voting runs on Cloudflare Pages Functions and D1.

Live site: `https://moobangbench.pages.dev`

Source: `https://github.com/JSCOP/moobang-bench`

## Local development

Requirements: Node.js 20+ and `.dev.vars` containing `VOTE_SALT=dev-salt`.

```sh
npm install
npm run build
npm run db:migrate:local
npm run preview:cf
```

Open `http://127.0.0.1:8788`. `npm run dev` runs only the UI; voting requires the Cloudflare preview command.

## Zero-cost production stack

Cloudflare Pages is used instead of GitHub Pages because GitHub Pages cannot run the vote API or D1 database.

Free-plan capacity relevant to this project:

- Static asset requests: free and unlimited.
- Pages Functions: included in the Workers Free quota of 100,000 requests per day.
- D1: 5 million rows read/day, 100,000 rows written/day, and 5 GB storage.
- Default production URL: `https://moobangbench.pages.dev`; no purchased domain is required.

### Provisioned production resources

The Pages project, D1 database, production schema, and `VOTE_SALT` secret are already provisioned. The commands below are only needed when recreating the stack in another Cloudflare account.

```sh
npx wrangler login
npm run cf:pages:create
npm run cf:db:create
```

Copy the `database_id` returned by the last command into `wrangler.toml`, replacing `PLACEHOLDER`, then run:

```sh
npm run db:migrate:remote
npx wrangler pages secret put VOTE_SALT --project-name moobangbench
npm run deploy
```

Use a long random value for `VOTE_SALT`. Every later manual deployment is `npm run deploy`.

### GitHub automatic deployment

`.github/workflows/deploy.yml` deploys every push to `main` after both required repository secrets exist. `CLOUDFLARE_ACCOUNT_ID` is configured; create a scoped Cloudflare API token and add it as:

- `CLOUDFLARE_API_TOKEN`: token with Pages edit access.

Optional AdSense values from `.env.example` are added only after AdSense approval. Until the API token exists, the workflow safely skips and manual `npm run deploy` remains available.

## AdSense constraint

The code integration is ready, including environment-controlled script loading, three configurable ad slots, `ads.txt`, stable placeholders, and `/privacy`.

Google requires a standard domain without a path and states that subdomains are allowed only for AdSense host partners. `moobangbench.pages.dev` and `*.github.io` are provider subdomains, so regular AdSense enrollment cannot be completed on the fully free URL.

To enable AdSense later:

1. Purchase or otherwise obtain a standard domain you control and attach it to the Pages project.
2. Apply for AdSense and wait for Google site approval.
3. Add the real client and slot ids from `.env.example` as build environment variables or GitHub Actions secrets.
4. Rebuild; `scripts/write-ads-txt.ts` generates the correct `dist/ads.txt` entry automatically.
5. Enable Google's consent management message where required.

Without all AdSense variables, the site intentionally renders ad placeholders and sends no AdSense requests.

## Add benchmark content

1. Copy an artifact to `public/demos/<result-id>/`.
2. Add new benchmark, model, or tool records under `src/data/`.
3. Append the result to `src/data/results.json`.
4. Run `npm run check:data` and `npm run build`, then push or run `npm run deploy`.

Editor scores are the one-decimal mean of functionality, code quality, polish, and performance. Leave `editorScores` as `null` until reviewed.
