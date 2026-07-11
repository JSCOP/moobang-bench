import { useEffect } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';

const client = process.env.EXPO_PUBLIC_ADSENSE_CLIENT;

type AdSlotProps = {
  slot: string;
  style?: StyleProp<ViewStyle>;
};

export function AdSlot({ slot, style }: AdSlotProps) {
  const { t } = useI18n();

  useEffect(() => {
    if (!client) return;
    const adWindow = window as typeof window & { adsbygoogle?: unknown[] };
    (adWindow.adsbygoogle ??= []).push({});
  }, []);

  if (!client) {
    return (
      <View style={[styles.placeholder, style]}>
        <Text style={styles.placeholderText}>{t('ad')}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.live, style]}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: { minHeight: 90, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, marginVertical: spacing.lg },
  placeholderText: { color: colors.faint, fontSize: 10, textTransform: 'uppercase', letterSpacing: 2 },
  live: { minHeight: 90, marginVertical: spacing.lg },
});
