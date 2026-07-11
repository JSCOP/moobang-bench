import Head from 'expo-router/head';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AdSlot } from '@/components/AdSlot';
import { ResultCard } from '@/components/ResultCard';
import { getBenchmarks, getResultsByBenchmark } from '@/data';
import { useScores } from '@/hooks/useScores';
import { colors, spacing } from '@/theme';

export function generateStaticParams() {
  return getBenchmarks().map((benchmark) => ({ id: benchmark.id }));
}

export default function BenchmarkDetailPage() {
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
  header: { gap: spacing.sm, maxWidth: 800 },
  date: { color: colors.cyan, fontSize: 13, fontWeight: '800' },
  title: { color: colors.text, fontSize: 42, lineHeight: 48, fontWeight: '900' },
  description: { color: colors.muted, fontSize: 18, lineHeight: 27 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tag: { color: colors.purple, fontWeight: '800', fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, alignItems: 'flex-start' },
});
