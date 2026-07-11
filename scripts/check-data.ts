import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { dataSchema } from '../src/data/validate';

const load = (name: string): unknown =>
  JSON.parse(readFileSync(resolve(process.cwd(), 'src/data', `${name}.json`), 'utf8'));

const parsed = dataSchema.safeParse({
  tools: load('tools'),
  models: load('models'),
  benchmarks: load('benchmarks'),
  results: load('results'),
});

if (!parsed.success) {
  console.error('Benchmark data validation failed:');
  for (const issue of parsed.error.issues) {
    console.error(`- ${issue.path.join('.') || 'data'}: ${issue.message}`);
  }
  process.exit(1);
}

console.log(
  `Validated ${parsed.data.benchmarks.length} benchmark(s), ${parsed.data.results.length} result(s), ${parsed.data.models.length} model(s), and ${parsed.data.tools.length} tool(s).`,
);
