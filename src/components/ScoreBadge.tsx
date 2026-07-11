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
      <View style={styles.badge}>
        <Text style={styles.label}>{t('editor')}</Text>
        <Text style={[styles.value, editor !== null && styles.valueAccent]}>
          {editor === null ? '—' : `${editor.toFixed(1)}/10`}
        </Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.label}>{t('community')}</Text>
        <Text style={styles.value}>{community ? `${community.avg.toFixed(1)}/10 (${community.count})` : t('no_votes')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, backgroundColor: colors.surfaceRaised, paddingHorizontal: spacing.sm, paddingVertical: 5 },
  label: { color: colors.faint, fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  value: { color: colors.text, fontSize: 12, fontWeight: '700' },
  valueAccent: { color: colors.accent },
});
