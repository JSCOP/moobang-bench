import { z } from 'zod';

const id = z.string().regex(/^[a-z0-9][a-z0-9.-]{1,63}$/);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const toolSchema = z.object({
  id,
  name: z.string().min(1),
  homepage: z.url().optional(),
  description: z.string().min(1),
});

export const modelSchema = z.object({
  id,
  name: z.string().min(1),
  vendor: z.string().min(1),
  description: z.string().min(1).optional(),
});

export const benchmarkSchema = z.object({
  id,
  title: z.string().min(1),
  description: z.string().min(1),
  date,
  tags: z.array(z.string().min(1)),
});

export const editorScoresSchema = z.object({
  functionality: z.number().min(0).max(10),
  codeQuality: z.number().min(0).max(10),
  polish: z.number().min(0).max(10),
  performance: z.number().min(0).max(10),
});

export const resultSchema = z.object({
  id,
  benchmark: id,
  model: id,
  tool: id,
  date,
  editorScores: editorScoresSchema.nullable(),
  notes: z.string().min(1).optional(),
});

export const dataSchema = z
  .object({
    tools: z.array(toolSchema),
    models: z.array(modelSchema),
    benchmarks: z.array(benchmarkSchema),
    results: z.array(resultSchema),
  })
  .superRefine((data, ctx) => {
    const groups = [
      ['tool', data.tools],
      ['model', data.models],
      ['benchmark', data.benchmarks],
      ['result', data.results],
    ] as const;

    for (const [label, items] of groups) {
      const seen = new Set<string>();
      for (const item of items) {
        if (seen.has(item.id)) {
          ctx.addIssue({ code: 'custom', message: `Duplicate ${label} id: ${item.id}` });
        }
        seen.add(item.id);
      }
    }

    const toolIds = new Set(data.tools.map((item) => item.id));
    const modelIds = new Set(data.models.map((item) => item.id));
    const benchmarkIds = new Set(data.benchmarks.map((item) => item.id));
    for (const result of data.results) {
      if (!toolIds.has(result.tool)) ctx.addIssue({ code: 'custom', message: `${result.id}: unknown tool ${result.tool}` });
      if (!modelIds.has(result.model)) ctx.addIssue({ code: 'custom', message: `${result.id}: unknown model ${result.model}` });
      if (!benchmarkIds.has(result.benchmark)) ctx.addIssue({ code: 'custom', message: `${result.id}: unknown benchmark ${result.benchmark}` });
    }
  });

export type Tool = z.infer<typeof toolSchema>;
export type Model = z.infer<typeof modelSchema>;
export type Benchmark = z.infer<typeof benchmarkSchema>;
export type Result = z.infer<typeof resultSchema>;
export type BenchmarkData = z.infer<typeof dataSchema>;
