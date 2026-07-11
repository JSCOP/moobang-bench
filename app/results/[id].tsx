import Head from 'expo-router/head';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AdSlot } from '@/components/AdSlot';
import { DemoFrame } from '@/components/DemoFrame';
import { ScoreBadge } from '@/components/ScoreBadge';
import { VoteWidget } from '@/components/VoteWidget';
import { editorScore, getBenchmarks, getModel, getResult, getResults, getTool } from '@/data';
import { useScores, type CommunityScore } from '@/hooks/useScores';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';

export function generateStaticParams() {
  return getResults().map((result) => ({ id: result.id }));
}

export default function ResultDetailPage() {
  const { t } = useI18n();
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const result = getResult(id);
  const fetchedScores = useScores(result ? [result.id] : []);
  const [votedScore, setVotedScore] = useState<CommunityScore>();
  const fullscreenRef = useRef<HTMLDivElement>(null);

  if (!result) return <Text style={styles.notFound}>{t('not_found')}</Text>;

  const benchmark = getBenchmarks().find((item) => item.id === result.benchmark);
  const model = getModel(result.model);
  const tool = getTool(result.tool);
  const community = votedScore ?? fetchedScores?.[result.id];
  const title = result.tool === 'none' ? model?.name : `${model?.name} · ${tool?.name}`;
  const criteria = result.editorScores
    ? [
        ['functionality', result.editorScores.functionality],
        ['code_quality', result.editorScores.codeQuality],
        ['polish', result.editorScores.polish],
        ['performance', result.editorScores.performance],
      ] as const
    : [];

  return (
    <View style={styles.page}>
      <Head>
        <title>{title} — {benchmark?.title} — MoobangBench</title>
        <meta name="description" content={`Live benchmark artifact from ${title}.`} />
      </Head>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{benchmark?.title}</Text>
        <Text style={styles.title}>{title}</Text>
        <ScoreBadge editor={editorScore(result)} community={community} />
      </View>

      <div ref={fullscreenRef} style={{ background: '#000', borderRadius: 14, overflow: 'hidden' }}>
        <DemoFrame resultId={result.id} height="70vh" />
      </div>
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" style={styles.button} onPress={() => void fullscreenRef.current?.requestFullscreen()}>
          <Text style={styles.buttonText}>{t('fullscreen')}</Text>
        </Pressable>
        <a href={`/demos/${result.id}/index.html`} target="_blank" rel="noreferrer" style={styles.rawLink as React.CSSProperties}>
          {t('open_raw')} ↗
        </a>
      </View>

      <View style={styles.panels}>
        <View style={styles.panel}>
          <MetaRow label={t('benchmark')} value={benchmark?.title ?? result.benchmark} />
          <MetaRow label={t('model')} value={`${model?.name ?? result.model}${model?.vendor ? ` · ${model.vendor}` : ''}`} />
          <MetaRow label={t('tool')} value={result.tool === 'none' ? t('direct_model') : tool?.name ?? result.tool} />
          <MetaRow label={t('date')} value={result.date} />
          {result.notes ? <MetaRow label={t('notes')} value={result.notes} /> : null}
        </View>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{t('editor_breakdown')}</Text>
          {criteria.length ? criteria.map(([key, value]) => (
            <View key={key} style={styles.criterion}>
              <Text style={styles.metaLabel}>{t(key)}</Text>
              <Text style={styles.criterionValue}>{value.toFixed(1)}/10</Text>
            </View>
          )) : <Text style={styles.unrated}>{t('editor_unrated')}</Text>}
        </View>
      </View>

      <View style={styles.votePanel}>
        <ScoreBadge editor={editorScore(result)} community={community} />
        <VoteWidget resultId={result.id} onVoted={setVotedScore} />
      </View>
      <AdSlot slot="0000000003" />
    </View>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { paddingVertical: spacing.xl, gap: spacing.lg },
  header: { gap: spacing.sm },
  eyebrow: { color: colors.cyan, fontSize: 13, fontWeight: '800' },
  title: { color: colors.text, fontSize: 38, fontWeight: '900' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, alignItems: 'center' },
  button: { backgroundColor: colors.cyan, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  buttonText: { color: colors.background, fontWeight: '900' },
  rawLink: { color: colors.cyan, fontWeight: '800', textDecorationLine: 'none' },
  panels: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  panel: { flexBasis: 340, flexGrow: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.lg, backgroundColor: colors.surface, gap: spacing.md },
  panelTitle: { color: colors.text, fontSize: 20, fontWeight: '900' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: spacing.sm },
  metaLabel: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  metaValue: { color: colors.text, fontSize: 14, textAlign: 'right', flexShrink: 1 },
  criterion: { flexDirection: 'row', justifyContent: 'space-between' },
  criterionValue: { color: colors.lime, fontWeight: '900' },
  unrated: { color: colors.muted, fontSize: 16 },
  votePanel: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.lg, backgroundColor: colors.surface, gap: spacing.lg },
  notFound: { color: colors.danger, padding: spacing.xl },
});
