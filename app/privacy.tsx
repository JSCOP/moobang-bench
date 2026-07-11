import Head from 'expo-router/head';
import type { CSSProperties } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';

const sections = [
  ['privacy_votes_title', 'privacy_votes_body'],
  ['privacy_storage_title', 'privacy_storage_body'],
  ['privacy_ads_title', 'privacy_ads_body'],
  ['privacy_contact_title', 'privacy_contact_body'],
] as const;

export default function PrivacyPage() {
  const { t } = useI18n();

  return (
    <View style={styles.page}>
      <Head>
        <title>Privacy Policy — MoobangBench</title>
        <meta name="description" content="MoobangBench privacy policy for voting, local storage, and advertising." />
      </Head>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MOOBANGBENCH</Text>
        <Text style={styles.title}>{t('privacy_title')}</Text>
        <Text style={styles.intro}>{t('privacy_intro')}</Text>
      </View>
      {sections.map(([title, body]) => (
        <View key={title} style={styles.section}>
          <Text style={styles.sectionTitle}>{t(title)}</Text>
          <Text style={styles.body}>{t(body)}</Text>
        </View>
      ))}
      <a href="https://github.com/JSCOP/moobang-bench/issues" target="_blank" rel="noreferrer" style={linkStyle}>
        github.com/JSCOP/moobang-bench/issues ↗
      </a>
    </View>
  );
}
const linkStyle: CSSProperties = {
  color: colors.accent,
  fontSize: 13,
  textDecoration: 'none',
};

const styles = StyleSheet.create({
  page: { paddingVertical: spacing.xl, gap: spacing.lg, maxWidth: 760 },
  header: { gap: spacing.sm, marginBottom: spacing.sm },
  eyebrow: { color: colors.faint, fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  intro: { color: colors.muted, fontSize: 15, lineHeight: 24 },
  section: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.lg, backgroundColor: colors.surface, gap: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  body: { color: colors.muted, fontSize: 13, lineHeight: 21 },
});
