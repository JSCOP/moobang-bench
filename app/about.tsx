import Head from 'expo-router/head';
import { StyleSheet, Text, View } from 'react-native';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <View style={styles.page}>
      <Head>
        <title>About — MoobangBench</title>
        <meta name="description" content="How MoobangBench evaluates AI coding artifacts." />
      </Head>
      <Text style={styles.title}>{t('about_title')}</Text>
      <Text style={styles.lead}>{t('about_intro')}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('methodology_title')}</Text>
        <Text style={styles.body}>{t('methodology_body')}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('contact_title')}</Text>
        <Text style={styles.body}>{t('contact_body')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { paddingVertical: spacing.xl, gap: spacing.lg, maxWidth: 720 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  lead: { color: colors.muted, fontSize: 15, lineHeight: 24 },
  card: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.lg, backgroundColor: colors.surface, gap: spacing.sm },
  cardTitle: { color: colors.text, fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  body: { color: colors.muted, fontSize: 14, lineHeight: 22 },
});
