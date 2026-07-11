import { StyleSheet, Text, View } from 'react-native';
import type { LeaderboardRow } from '@/data';
import type { CommunityScores } from '@/hooks/useScores';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';

function communityScore(row: LeaderboardRow, scores?: CommunityScores): number | null {
  if (!scores) return null;
  let weightedTotal = 0;
  let votes = 0;
  for (const resultId of row.resultIds) {
    const score = scores[resultId];
    if (!score) continue;
    weightedTotal += score.avg * score.count;
    votes += score.count;
  }
  return votes ? Math.round((weightedTotal / votes) * 10) / 10 : null;
}

export function LeaderboardTable({ title, rows, scores }: { title: string; rows: LeaderboardRow[]; scores?: CommunityScores }) {
  const { t } = useI18n();
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.table}>
        <View style={[styles.row, styles.header]}>
          <Text style={[styles.headerCell, styles.rank]}>#</Text>
          <Text style={[styles.headerCell, styles.name]}>{t('name')}</Text>
          <Text style={[styles.headerCell, styles.num]}>{t('editor')}</Text>
          <Text style={[styles.headerCell, styles.num]}>{t('community')}</Text>
          <Text style={[styles.headerCell, styles.num]}>{t('results')}</Text>
        </View>
        {rows.map((row, index) => {
          const community = communityScore(row, scores);
          const empty = row.resultCount === 0;
          return (
            <View key={row.id} style={[styles.row, index === rows.length - 1 && styles.lastRow, empty && styles.empty]}>
              <Text style={[styles.cell, styles.rank, styles.rankText]}>{index + 1}</Text>
              <View style={[styles.cell, styles.name]}>
                <Text style={styles.primary}>{row.name}</Text>
                <Text style={styles.secondary}>{empty ? t('no_data') : row.subtitle}</Text>
              </View>
              <Text style={[styles.cell, styles.num, row.editor !== null && styles.scoreText]}>
                {row.editor === null ? '—' : row.editor.toFixed(1)}
              </Text>
              <Text style={[styles.cell, styles.num]}>{community === null ? '—' : community.toFixed(1)}</Text>
              <Text style={[styles.cell, styles.num]}>{row.resultCount}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md, flexGrow: 1 },
  title: { color: colors.text, fontSize: 18, fontWeight: '700', letterSpacing: -0.2 },
  table: { minWidth: 640, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.surface },
  row: { flexDirection: 'row', alignItems: 'center', minHeight: 44, borderBottomWidth: 1, borderBottomColor: colors.border },
  lastRow: { borderBottomWidth: 0 },
  header: { minHeight: 34, backgroundColor: colors.surfaceRaised },
  empty: { opacity: 0.4 },
  headerCell: { paddingHorizontal: spacing.md, color: colors.faint, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, width: 110 },
  cell: { width: 110, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, color: colors.muted, fontSize: 13 },
  rank: { width: 44, textAlign: 'center', paddingHorizontal: 0 },
  rankText: { color: colors.faint, fontVariant: ['tabular-nums'] },
  num: { textAlign: 'right', fontVariant: ['tabular-nums'] },
  name: { flexGrow: 1, width: 220 },
  primary: { color: colors.text, fontSize: 13, fontWeight: '700' },
  secondary: { color: colors.faint, fontSize: 11, marginTop: 1 },
  scoreText: { color: colors.text, fontWeight: '700' },
});
