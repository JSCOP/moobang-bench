import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius } from '@/theme';

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
  container: { flexDirection: 'row', borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, overflow: 'hidden', alignSelf: 'flex-start' },
  button: { paddingHorizontal: 10, paddingVertical: 5 },
  selected: { backgroundColor: colors.surfaceRaised },
  label: { color: colors.faint, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  selectedLabel: { color: colors.text },
});
