import Head from 'expo-router/head';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getBenchmarks, getResultsByBenchmark, leaderboard } from '@/data';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';

export default function HomePage() {
  const { t } = useI18n();
  const benchmarks = [...getBenchmarks()].sort((a, b) => b.date.localeCompare(a.date));
  const topModels = leaderboard('model').slice(0, 5);

  return (
    <View style={styles.page}>
      <Head>
        <title>MoobangBench — AI Coding Benchmarks</title>
        <meta name="description" content="Live AI coding benchmark artifacts scored by editors and the community." />
      </Head>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>{t('hero_eyebrow')}</Text>
        <Text style={styles.heroTitle}>{t('hero_title')}</Text>
        <Text style={styles.tagline}>{t('hero_tagline')}</Text>
        <Link href="/benchmarks" asChild>
          <Pressable accessibilityRole="link" style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>{t('browse_benchmarks')} →</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('top_models')}</Text>
        <View style={styles.modelGrid}>
          {topModels.map((model, index) => (
            <View key={model.id} style={styles.modelCard}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <Text style={styles.modelName}>{model.name}</Text>
              <Text style={styles.muted}>{model.subtitle}</Text>
              <Text style={styles.score}>{model.editor === null ? '—' : `${model.editor.toFixed(1)}/10`}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('latest_benchmarks')}</Text>
        <View style={styles.benchmarkGrid}>
          {benchmarks.map((benchmark) => (
            <Link key={benchmark.id} href={{ pathname: '/benchmarks/[id]', params: { id: benchmark.id } }} asChild>
              <Pressable accessibilityRole="link" style={styles.benchmarkCard}>
                <Text style={styles.benchmarkTitle}>{benchmark.title}</Text>
                <Text style={styles.description}>{benchmark.description}</Text>
                <View style={styles.tagRow}>
                  {benchmark.tags.map((tag) => <Text key={tag} style={styles.tag}>{tag}</Text>)}
                </View>
                <Text style={styles.muted}>{getResultsByBenchmark(benchmark.id).length} {t('results')} · {benchmark.date}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { gap: spacing.xxl, paddingVertical: spacing.xl },
  hero: { paddingVertical: spacing.xxl, maxWidth: 850, gap: spacing.md },
  eyebrow: { color: colors.cyan, textTransform: 'uppercase', letterSpacing: 2, fontWeight: '900', fontSize: 13 },
  heroTitle: { color: colors.text, fontSize: 54, lineHeight: 58, fontWeight: '900', letterSpacing: -2 },
  tagline: { color: colors.muted, fontSize: 20, lineHeight: 30, maxWidth: 760 },
  primaryButton: { marginTop: spacing.sm, alignSelf: 'flex-start', backgroundColor: colors.cyan, borderRadius: radius.sm, paddingHorizontal: spacing.lg, paddingVertical: 14 },
  primaryButtonText: { color: colors.background, fontWeight: '900' },
  section: { gap: spacing.lg },
  sectionTitle: { color: colors.text, fontSize: 30, fontWeight: '900' },
  modelGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  modelCard: { flexBasis: 180, flexGrow: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, backgroundColor: colors.surface, gap: spacing.xs },
  rank: { color: colors.purple, fontWeight: '900', fontSize: 12 },
  modelName: { color: colors.text, fontWeight: '900', fontSize: 17 },
  muted: { color: colors.muted, fontSize: 13 },
  score: { color: colors.lime, fontWeight: '900', fontSize: 20, marginTop: spacing.sm },
  benchmarkGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  benchmarkCard: { flexBasis: 320, flexGrow: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.lg, backgroundColor: colors.surface, gap: spacing.md },
  benchmarkTitle: { color: colors.text, fontSize: 22, fontWeight: '900' },
  description: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tag: { color: colors.cyan, backgroundColor: '#0B1C24', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radius.sm, fontSize: 12, fontWeight: '700' },
});
