import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { editorScore, getModel, getTool } from '@/data';
import type { Result } from '@/data/validate';
import type { CommunityScore } from '@/hooks/useScores';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';
import { DemoThumbnail } from './DemoThumbnail';
import { ScoreBadge } from './ScoreBadge';

type ResultCardProps = {
  result: Result;
  community?: CommunityScore;
};

export function ResultCard({ result, community }: ResultCardProps) {
  const { t } = useI18n();
  const model = getModel(result.model);
  const tool = getTool(result.tool);

  return (
    <View style={styles.card}>
      <DemoThumbnail resultId={result.id} title={model?.name ?? result.model} />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{model?.name ?? result.model}</Text>
          {result.tool !== 'none' ? <Text style={styles.toolTag}>{tool?.name ?? result.tool}</Text> : null}
        </View>
        <ScoreBadge editor={editorScore(result)} community={community} />
        <View style={styles.actions}>
          <Link href={{ pathname: '/results/[id]', params: { id: result.id } }} asChild>
            <Pressable accessibilityRole="link" style={styles.link}>
              <Text style={styles.linkText}>{t('view_result')} →</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  card: { flexBasis: 320, flexGrow: 1, maxWidth: 560, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.surface },
  body: { padding: spacing.lg, gap: spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
  title: { color: colors.text, fontSize: 15, fontWeight: '700' },
  toolTag: { color: colors.muted, fontSize: 11, fontWeight: '600', borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.md },
  link: { alignSelf: 'flex-start', paddingVertical: spacing.xs },
  linkText: { color: colors.accent, fontSize: 13, fontWeight: '700' },
});
