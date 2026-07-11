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
          <Text style={[styles.cell, styles.rank]}>{t('rank')}</Text>
          <Text style={[styles.cell, styles.name]}>{t('name')}</Text>
          <Text style={styles.cell}>{t('editor')}</Text>
          <Text style={styles.cell}>{t('community')}</Text>
          <Text style={styles.cell}>{t('results')}</Text>
        </View>
        {rows.map((row, index) => {
          const community = communityScore(row, scores);
          const empty = row.resultCount === 0;
          return (
            <View key={row.id} style={[styles.row, empty && styles.empty]}>
              <Text style={[styles.cell, styles.rank]}>{index + 1}</Text>
              <View style={[styles.cell, styles.name]}>
                <Text style={styles.primary}>{row.name}</Text>
                <Text style={styles.secondary}>{empty ? t('no_data') : row.subtitle}</Text>
              </View>
              <Text style={styles.cell}>{row.editor === null ? '—' : row.editor.toFixed(1)}</Text>
              <Text style={styles.cell}>{community === null ? '—' : community.toFixed(1)}</Text>
              <Text style={styles.cell}>{row.resultCount}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md },
  title: { color: colors.text, fontSize: 26, fontWeight: '900' },
  table: { minWidth: 680, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', minHeight: 58, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface },
  header: { minHeight: 42, backgroundColor: colors.surfaceRaised },
  empty: { opacity: 0.45 },
  cell: { width: 120, paddingHorizontal: spacing.sm, color: colors.text, fontSize: 13 },
  rank: { width: 56, textAlign: 'center' },
  name: { flexGrow: 1, width: 220 },
  primary: { color: colors.text, fontWeight: '800' },
  secondary: { color: colors.muted, fontSize: 11, marginTop: 2 },
});
