import Head from 'expo-router/head';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AdSlot } from '@/components/AdSlot';
import { ResultCard } from '@/components/ResultCard';
import { getBenchmarks, getResultsByBenchmark } from '@/data';
import { useScores } from '@/hooks/useScores';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';

export function generateStaticParams() {
  return getBenchmarks().map((benchmark) => ({ id: benchmark.id }));
}

export default function BenchmarkDetailPage() {
  const { t } = useI18n();
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const benchmark = getBenchmarks().find((item) => item.id === id);
  const results = benchmark ? getResultsByBenchmark(benchmark.id) : [];
  const scores = useScores(results.map((result) => result.id));

  if (!benchmark) return null;

  return (
    <View style={styles.page}>
      <Head>
        <title>{benchmark.title} — MoobangBench</title>
        <meta name="description" content={benchmark.description} />
      </Head>
      <View style={styles.header}>
        <Text style={styles.date}>{benchmark.date}</Text>
        <Text style={styles.title}>{benchmark.title}</Text>
        <Text style={styles.description}>{benchmark.description}</Text>
        <Text style={styles.playHint}>{t('play_hint')}</Text>
        <View style={styles.tags}>{benchmark.tags.map((tag) => <Text key={tag} style={styles.tag}>{tag}</Text>)}</View>
      </View>
      <View style={styles.grid}>
        {results.map((result) => <ResultCard key={result.id} result={result} community={scores?.[result.id]} />)}
      </View>
      <AdSlot slot="0000000002" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { paddingVertical: spacing.xl, gap: spacing.xl },
  header: { gap: spacing.sm, maxWidth: 720 },
  date: { color: colors.faint, fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  title: { color: colors.text, fontSize: 28, lineHeight: 34, fontWeight: '800', letterSpacing: -0.5 },
  description: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  playHint: { color: colors.text, fontSize: 13, lineHeight: 20, borderLeftWidth: 2, borderLeftColor: colors.accent, paddingLeft: spacing.md, marginTop: spacing.sm },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  tag: { color: colors.muted, fontSize: 11, fontWeight: '600', borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, alignItems: 'flex-start' },
});
