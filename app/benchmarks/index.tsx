import Head from 'expo-router/head';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getBenchmarks, getResultsByBenchmark } from '@/data';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';

export default function BenchmarksPage() {
  const { t } = useI18n();
  const benchmarks = getBenchmarks();
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
      <View style={styles.list}>
        {benchmarks.map((benchmark, index) => (
          <Link key={benchmark.id} href={{ pathname: '/benchmarks/[id]', params: { id: benchmark.id } }} asChild>
            <Pressable
              accessibilityRole="link"
              style={StyleSheet.flatten([styles.rowItem, index === benchmarks.length - 1 && styles.lastRow])}
            >
              <View style={styles.rowMain}>
                <Text style={styles.rowTitle}>{benchmark.title}</Text>
                <Text style={styles.rowDescription}>{benchmark.description}</Text>
                <View style={styles.tags}>
                  {benchmark.tags.map((tag) => <Text key={tag} style={styles.tag}>{tag}</Text>)}
                </View>
              </View>
              <View style={styles.rowMeta}>
                <Text style={styles.metaCount}>{getResultsByBenchmark(benchmark.id).length} {t('results')}</Text>
                <Text style={styles.metaDate}>{benchmark.date}</Text>
                <Text style={styles.link}>{t('view_benchmark')} →</Text>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { paddingVertical: spacing.xl, gap: spacing.xl },
  header: { gap: spacing.sm, maxWidth: 680 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  description: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  list: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, overflow: 'hidden' },
  rowItem: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg, justifyContent: 'space-between', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  lastRow: { borderBottomWidth: 0 },
  rowMain: { flexGrow: 1, flexShrink: 1, flexBasis: 320, gap: spacing.sm },
  rowTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  rowDescription: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  tags: { flexDirection: 'row', gap: spacing.xs, flexWrap: 'wrap' },
  tag: { color: colors.muted, fontSize: 11, fontWeight: '600', borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2 },
  rowMeta: { alignItems: 'flex-end', justifyContent: 'space-between', gap: spacing.xs },
  metaCount: { color: colors.text, fontSize: 13, fontWeight: '700', fontVariant: ['tabular-nums'] },
  metaDate: { color: colors.faint, fontSize: 12 },
  link: { color: colors.accent, fontSize: 12, fontWeight: '700' },
});
