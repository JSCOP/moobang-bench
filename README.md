# MoobangBench

Expo Router static site for comparing playable AI coding benchmark artifacts. Community voting runs on Cloudflare Pages Functions and D1.

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

### First deployment

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

`.github/workflows/deploy.yml` deploys every push to `main`. Add these GitHub Actions repository secrets:

- `CLOUDFLARE_API_TOKEN`: token with Pages edit access.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account id.
- Optional AdSense values listed in `.env.example` after approval.

The committed `wrangler.toml` must contain the real D1 database id before the workflow runs.

## AdSense constraint

The code integration is ready, including environment-controlled script loading, three configurable ad slots, `ads.txt`, stable placeholders, and `/privacy`.

Google requires a standard domain without a path and states that subdomains are allowed only for AdSense host partners. `moobangbench.pages.dev` and `*.github.io` are provider subdomains, so regular AdSense enrollment cannot be completed on the fully free URL.

To enable AdSense later:

1. Purchase or otherwise obtain a standard domain you control and attach it to the Pages project.
2. Apply for AdSense and wait for Google site approval.
3. Copy `.env.example` values into Cloudflare Pages or GitHub Actions build variables using the real client and slot ids.
4. Replace the publisher id in `public/ads.txt`.
5. Enable Google's consent management message where required.

Without all AdSense variables, the site intentionally renders ad placeholders and sends no AdSense requests.

## Add benchmark content

1. Copy an artifact to `public/demos/<result-id>/`.
2. Add new benchmark, model, or tool records under `src/data/`.
3. Append the result to `src/data/results.json`.
4. Run `npm run check:data` and `npm run build`, then push or run `npm run deploy`.

Editor scores are the one-decimal mean of functionality, code quality, polish, and performance. Leave `editorScores` as `null` until reviewed.
