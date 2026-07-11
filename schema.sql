CREATE TABLE IF NOT EXISTS votes (
  result_id TEXT NOT NULL,
  voter_hash TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 10),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (result_id, voter_hash)
);

CREATE INDEX IF NOT EXISTS idx_votes_result ON votes(result_id);
