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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('top_models')}</Text>
          <Link href="/leaderboard" asChild>
            <Pressable accessibilityRole="link">
              <Text style={styles.sectionLink}>{t('nav_leaderboard')} →</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.panel}>
          {topModels.map((model, index) => (
            <View key={model.id} style={[styles.modelRow, index === topModels.length - 1 && styles.lastRow]}>
              <Text style={styles.rank}>{index + 1}</Text>
              <View style={styles.modelInfo}>
                <Text style={styles.modelName}>{model.name}</Text>
                <Text style={styles.mutedSmall}>{model.subtitle}</Text>
              </View>
              <Text style={styles.score}>{model.editor === null ? '—' : model.editor.toFixed(1)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('latest_benchmarks')}</Text>
          <Link href="/benchmarks" asChild>
            <Pressable accessibilityRole="link">
              <Text style={styles.sectionLink}>{t('nav_benchmarks')} →</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.benchmarkGrid}>
          {benchmarks.map((benchmark) => (
            <Link key={benchmark.id} href={{ pathname: '/benchmarks/[id]', params: { id: benchmark.id } }} asChild>
              <Pressable accessibilityRole="link" style={styles.benchmarkPanel}>
                <View style={styles.benchmarkTop}>
                  <Text style={styles.benchmarkTitle}>{benchmark.title}</Text>
                  <Text style={styles.mutedSmall}>{benchmark.date}</Text>
                </View>
                <Text style={styles.description}>{benchmark.description}</Text>
                <View style={styles.benchmarkFooter}>
                  <View style={styles.tagRow}>
                    {benchmark.tags.map((tag) => <Text key={tag} style={styles.tag}>{tag}</Text>)}
                  </View>
                  <Text style={styles.count}>{getResultsByBenchmark(benchmark.id).length} {t('results')}</Text>
                </View>
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
  hero: { paddingVertical: spacing.xl, maxWidth: 760, gap: spacing.md },
  eyebrow: { color: colors.faint, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: '700', fontSize: 11 },
  heroTitle: { color: colors.text, fontSize: 40, lineHeight: 46, fontWeight: '800', letterSpacing: -1 },
  tagline: { color: colors.muted, fontSize: 16, lineHeight: 25, maxWidth: 620 },
  primaryButton: { marginTop: spacing.sm, alignSelf: 'flex-start', backgroundColor: colors.text, borderRadius: radius.sm, paddingHorizontal: spacing.lg, paddingVertical: 10 },
  primaryButtonText: { color: colors.bg, fontSize: 13, fontWeight: '700' },
  section: { gap: spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: spacing.md },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '700', letterSpacing: -0.2 },
  sectionLink: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  panel: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, overflow: 'hidden' },
  modelRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  lastRow: { borderBottomWidth: 0 },
  rank: { width: 20, color: colors.faint, fontSize: 12, fontWeight: '700', fontVariant: ['tabular-nums'] },
  modelInfo: { flexGrow: 1, flexShrink: 1 },
  modelName: { color: colors.text, fontSize: 14, fontWeight: '700' },
  mutedSmall: { color: colors.faint, fontSize: 11 },
  score: { color: colors.accent, fontSize: 14, fontWeight: '700', fontVariant: ['tabular-nums'] },
  benchmarkGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  benchmarkPanel: { flexBasis: 320, flexGrow: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.lg, backgroundColor: colors.surface, gap: spacing.sm },
  benchmarkTop: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: spacing.md },
  benchmarkTitle: { color: colors.text, fontSize: 15, fontWeight: '700', flexShrink: 1 },
  description: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  benchmarkFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.xs },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  tag: { color: colors.muted, fontSize: 11, fontWeight: '600', borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2 },
  count: { color: colors.faint, fontSize: 12, fontVariant: ['tabular-nums'] },
});
