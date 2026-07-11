import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { editorScore, getModel, getTool } from '@/data';
import type { Result } from '@/data/validate';
import type { CommunityScore } from '@/hooks/useScores';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';
import { DemoFrame } from './DemoFrame';
import { ScoreBadge } from './ScoreBadge';

type ResultCardProps = {
  result: Result;
  community?: CommunityScore;
};

export function ResultCard({ result, community }: ResultCardProps) {
  const { t } = useI18n();
  const model = getModel(result.model);
  const tool = getTool(result.tool);
  const title = result.tool === 'none' ? model?.name : `${model?.name} · ${tool?.name}`;

  return (
    <View style={styles.card}>
      <DemoFrame resultId={result.id} height={260} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <ScoreBadge editor={editorScore(result)} community={community} />
        <Link href={{ pathname: '/results/[id]', params: { id: result.id } }} asChild>
          <Pressable accessibilityRole="link" style={styles.link}>
            <Text style={styles.linkText}>{t('view_result')} →</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexBasis: 330, flexGrow: 1, maxWidth: 535, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.surface },
  body: { padding: spacing.md, gap: spacing.md },
  title: { color: colors.text, fontSize: 18, fontWeight: '800' },
  link: { alignSelf: 'flex-start', paddingVertical: spacing.sm },
  linkText: { color: colors.cyan, fontWeight: '800' },
});
