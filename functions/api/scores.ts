interface Env {
  DB: D1Database;
  VOTE_SALT: string;
}

const RESULT_ID = /^[a-z0-9][a-z0-9.-]{1,63}$/;

type AggregateRow = {
  result_id: string;
  avg: number;
  count: number;
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const rawIds = (url.searchParams.get('ids') ?? '').split(',').filter(Boolean);
  const ids = [...new Set(rawIds)].slice(0, 50);

  if (!ids.length || ids.some((id) => !RESULT_ID.test(id))) {
    return Response.json({}, { headers: { 'Cache-Control': 'no-store' } });
  }

  const placeholders = ids.map((_, index) => `?${index + 1}`).join(',');
  const rows = await env.DB.prepare(
    `SELECT result_id, ROUND(AVG(rating), 1) AS avg, COUNT(*) AS count
     FROM votes
     WHERE result_id IN (${placeholders})
     GROUP BY result_id`,
  )
    .bind(...ids)
    .all<AggregateRow>();

  const scores: Record<string, { avg: number; count: number }> = {};
  for (const row of rows.results) {
    scores[row.result_id] = { avg: row.avg, count: row.count };
  }

  return Response.json(scores, { headers: { 'Cache-Control': 'no-store' } });
};
