import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const client = process.env.EXPO_PUBLIC_ADSENSE_CLIENT?.trim();
const publisher = client?.match(/^ca-(pub-\d+)$/)?.[1];
const content = publisher
  ? `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`
  : '# AdSense is not configured for this deployment.\n';

mkdirSync(resolve(process.cwd(), 'dist'), { recursive: true });
writeFileSync(resolve(process.cwd(), 'dist/ads.txt'), content, 'utf8');
console.log(publisher ? 'Generated production ads.txt.' : 'Generated disabled ads.txt.');
