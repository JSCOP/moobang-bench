import Head from 'expo-router/head';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getBenchmarks, getResultsByBenchmark } from '@/data';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';

export default function BenchmarksPage() {
  const { t } = useI18n();
  return (
    <View style={styles.page}>
      <Head>
        <title>Benchmarks — MoobangBench</title>
        <meta name="description" content="Browse live AI coding benchmark comparisons." />
      </Head>
      <View style={styles.header}>
        <Text style={styles.title}>{t('benchmarks_title')}</Text>
        <Text style={styles.description}>{t('benchmarks_description')}</Text>
      </View>
      <View style={styles.grid}>
        {getBenchmarks().map((benchmark) => (
          <Link key={benchmark.id} href={{ pathname: '/benchmarks/[id]', params: { id: benchmark.id } }} asChild>
            <Pressable accessibilityRole="link" style={styles.card}>
              <Text style={styles.cardTitle}>{benchmark.title}</Text>
              <Text style={styles.cardDescription}>{benchmark.description}</Text>
              <View style={styles.tags}>{benchmark.tags.map((tag) => <Text key={tag} style={styles.tag}>{tag}</Text>)}</View>
              <Text style={styles.meta}>{getResultsByBenchmark(benchmark.id).length} {t('results')} · {benchmark.date}</Text>
              <Text style={styles.link}>{t('view_benchmark')} →</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { paddingVertical: spacing.xl, gap: spacing.xl },
  header: { gap: spacing.sm, maxWidth: 720 },
  title: { color: colors.text, fontSize: 42, fontWeight: '900' },
  description: { color: colors.muted, fontSize: 18, lineHeight: 27 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  card: { flexBasis: 360, flexGrow: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.lg, backgroundColor: colors.surface, gap: spacing.md },
  cardTitle: { color: colors.text, fontSize: 24, fontWeight: '900' },
  cardDescription: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  tags: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  tag: { color: colors.cyan, fontSize: 12, fontWeight: '700' },
  meta: { color: colors.muted, fontSize: 13 },
  link: { color: colors.cyan, fontWeight: '900' },
});
