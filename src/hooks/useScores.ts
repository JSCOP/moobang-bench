import { useEffect, useMemo, useState } from 'react';

export type CommunityScore = { avg: number; count: number };
export type CommunityScores = Record<string, CommunityScore>;

export function useScores(ids: string[]): CommunityScores | undefined {
  const key = useMemo(() => [...new Set(ids)].sort().join(','), [ids]);
  const [scores, setScores] = useState<CommunityScores>();

  useEffect(() => {
    let active = true;
    setScores(undefined);

    if (!key) {
      setScores({});
      return () => {
        active = false;
      };
    }

    void fetch(`/api/scores?ids=${encodeURIComponent(key)}`)
      .then(async (response) => {
        if (!response.ok) return {};
        return (await response.json()) as CommunityScores;
      })
      .catch(() => ({}))
      .then((next) => {
        if (active) setScores(next);
      });

    return () => {
      active = false;
    };
  }, [key]);

  return scores;
}
