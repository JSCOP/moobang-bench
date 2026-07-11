import { StyleSheet, Text, View } from 'react-native';
import { useI18n } from '@/i18n/I18nContext';
import { colors, contentMaxWidth, spacing } from '@/theme';

export function Footer() {
  const { t } = useI18n();
  return (
    <View style={styles.shell}>
      <View style={styles.inner}>
        <Text style={styles.copy}>© 2026 MoobangBench · {t('footer_copy')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { marginTop: spacing.xxl, borderTopWidth: 1, borderTopColor: colors.border },
  inner: { width: '100%', maxWidth: contentMaxWidth, marginHorizontal: 'auto', paddingHorizontal: spacing.md, paddingVertical: spacing.xl },
  copy: { color: colors.muted, fontSize: 13 },
});
