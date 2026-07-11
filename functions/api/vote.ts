interface Env {
  DB: D1Database;
  VOTE_SALT: string;
}

type VoteBody = {
  resultId?: unknown;
  rating?: unknown;
};

const RESULT_ID = /^[a-z0-9][a-z0-9.-]{1,63}$/;

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });

async function voterHash(request: Request, salt: string): Promise<string> {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const userAgent = request.headers.get('User-Agent') ?? 'unknown';
  const bytes = new TextEncoder().encode(`${ip}|${userAgent}|${salt}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.VOTE_SALT) return json({ error: 'Vote service is not configured.' }, 500);

  let body: VoteBody;
  try {
    body = await request.json<VoteBody>();
  } catch {
    return json({ error: 'Request body must be valid JSON.' }, 400);
  }

  const { resultId, rating } = body;
  if (typeof resultId !== 'string' || !RESULT_ID.test(resultId)) {
    return json({ error: 'Invalid resultId.' }, 400);
  }
  if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 10) {
    return json({ error: 'Rating must be an integer from 1 to 10.' }, 400);
  }

  const hash = await voterHash(request, env.VOTE_SALT);
  await env.DB.prepare(
    `INSERT INTO votes (result_id, voter_hash, rating)
     VALUES (?1, ?2, ?3)
     ON CONFLICT(result_id, voter_hash)
     DO UPDATE SET rating = excluded.rating, created_at = datetime('now')`,
  )
    .bind(resultId, hash, rating)
    .run();

  const aggregate = await env.DB.prepare(
    'SELECT ROUND(AVG(rating), 1) AS avg, COUNT(*) AS count FROM votes WHERE result_id = ?1',
  )
    .bind(resultId)
    .first<{ avg: number; count: number }>();

  return json({ avg: aggregate?.avg ?? rating, count: aggregate?.count ?? 1, yourRating: rating });
};
