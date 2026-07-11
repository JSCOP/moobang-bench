import benchmarksJson from './benchmarks.json';
import modelsJson from './models.json';
import resultsJson from './results.json';
import toolsJson from './tools.json';
import { dataSchema, type Benchmark, type Model, type Result, type Tool } from './validate';

const data = dataSchema.parse({
  benchmarks: benchmarksJson,
  models: modelsJson,
  results: resultsJson,
  tools: toolsJson,
});

export type LeaderboardRow = {
  id: string;
  name: string;
  subtitle?: string;
  editor: number | null;
  resultCount: number;
  resultIds: string[];
};

export const getBenchmarks = (): Benchmark[] => data.benchmarks;
export const getResults = (): Result[] => data.results;
export const getResultsByBenchmark = (id: string): Result[] => data.results.filter((result) => result.benchmark === id);
export const getResult = (id: string): Result | undefined => data.results.find((result) => result.id === id);
export const getModel = (id: string): Model | undefined => data.models.find((model) => model.id === id);
export const getTool = (id: string): Tool | undefined => data.tools.find((tool) => tool.id === id);

export function editorScore(result: Result): number | null {
  if (!result.editorScores) return null;
  const values = Object.values(result.editorScores);
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}

export function leaderboard(entity: 'model' | 'tool'): LeaderboardRow[] {
  const entities = entity === 'model' ? data.models : data.tools.filter((tool) => tool.id !== 'none');
  return entities
    .map((item) => {
      const matching = data.results.filter((result) => result[entity] === item.id);
      const scores = matching.map(editorScore).filter((score): score is number => score !== null);
      return {
        id: item.id,
        name: item.name,
        subtitle: 'vendor' in item ? item.vendor : undefined,
        editor: scores.length ? Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10 : null,
        resultCount: matching.length,
        resultIds: matching.map((result) => result.id),
      };
    })
    .sort((a, b) => (b.editor ?? -1) - (a.editor ?? -1) || b.resultCount - a.resultCount || a.name.localeCompare(b.name));
}
