import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AdSlot } from '@/components/AdSlot';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { I18nProvider } from '@/i18n/I18nContext';
import { colors, contentMaxWidth, spacing } from '@/theme';

export default function RootLayout() {
  return (
    <I18nProvider>
      <View style={styles.page}>
        <Header />
        <View style={styles.adWrap}>
          <AdSlot slot="0000000001" />
        </View>
        <View style={styles.content}>
          <Slot />
        </View>
        <Footer />
      </View>
    </I18nProvider>
  );
}

const styles = StyleSheet.create({
  page: { minHeight: '100%', backgroundColor: colors.background },
  adWrap: { width: '100%', maxWidth: contentMaxWidth, marginHorizontal: 'auto', paddingHorizontal: spacing.md },
  content: { width: '100%', maxWidth: contentMaxWidth, marginHorizontal: 'auto', paddingHorizontal: spacing.md, flexGrow: 1 },
});
