import Head from 'expo-router/head';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { getResults, leaderboard } from '@/data';
import { useScores } from '@/hooks/useScores';
import { useI18n } from '@/i18n/I18nContext';
import { colors, spacing } from '@/theme';

export default function AppsAgentsPage() {
  const { t } = useI18n();
  const scores = useScores(getResults().map((result) => result.id));

  return (
    <View style={styles.page}>
      <Head>
        <title>Apps &amp; Agents Ranking — MoobangBench</title>
        <meta name="description" content="Compare coding apps and agent harnesses across benchmark results." />
      </Head>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{t('nav_rankings')}</Text>
        <Text style={styles.title}>{t('apps_agents_title')}</Text>
        <Text style={styles.description}>{t('apps_agents_description')}</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <LeaderboardTable title={t('tools')} rows={leaderboard('tool')} scores={scores} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { paddingVertical: spacing.xl, gap: spacing.xl },
  header: { gap: spacing.sm, maxWidth: 680 },
  eyebrow: { color: colors.faint, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  description: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  scrollContent: { minWidth: '100%' },
});
