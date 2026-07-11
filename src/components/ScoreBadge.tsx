import { StyleSheet, Text, View } from 'react-native';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';
import type { CommunityScore } from '@/hooks/useScores';

type ScoreBadgeProps = {
  editor: number | null;
  community?: CommunityScore;
};

export function ScoreBadge({ editor, community }: ScoreBadgeProps) {
  const { t } = useI18n();
  return (
    <View style={styles.row}>
      <View style={[styles.badge, styles.editor]}>
        <Text style={styles.label}>{t('editor')}</Text>
        <Text style={styles.value}>{editor === null ? '—' : `${editor.toFixed(1)}/10`}</Text>
      </View>
      <View style={[styles.badge, styles.community]}>
        <Text style={styles.label}>{t('community')}</Text>
        <Text style={styles.value}>{community ? `${community.avg.toFixed(1)}/10 (${community.count})` : t('no_votes')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  badge: { borderWidth: 1, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 6, gap: 2 },
  editor: { borderColor: colors.purple, backgroundColor: '#1A1127' },
  community: { borderColor: colors.cyan, backgroundColor: '#0B1C24' },
  label: { color: colors.muted, fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.7 },
  value: { color: colors.text, fontSize: 13, fontWeight: '800' },
});
