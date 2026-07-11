import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';

export function LangToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <View accessibilityLabel={t('language')} style={styles.container}>
      {(['en', 'ko'] as const).map((option) => (
        <Pressable
          key={option}
          accessibilityRole="button"
          accessibilityState={{ selected: lang === option }}
          onPress={() => setLang(option)}
          style={[styles.button, lang === option && styles.selected]}
        >
          <Text style={[styles.label, lang === option && styles.selectedLabel]}>{option.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, overflow: 'hidden' },
  button: { paddingHorizontal: spacing.sm, paddingVertical: 6 },
  selected: { backgroundColor: colors.cyan },
  label: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  selectedLabel: { color: colors.background },
});
