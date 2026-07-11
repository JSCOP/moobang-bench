import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AdSlot } from '@/components/AdSlot';
import { MobileBar, Sidebar } from '@/components/Sidebar';
import { I18nProvider } from '@/i18n/I18nContext';
import { contentMaxWidth, spacing } from '@/theme';

export default function RootLayout() {
  return (
    <I18nProvider>
      <div className="mb-shell">
        <Sidebar />
        <div className="mb-main">
          <MobileBar />
          <View style={styles.content}>
            <AdSlot slot="0000000001" />
            <Slot />
          </View>
        </div>
      </div>
    </I18nProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: contentMaxWidth,
    marginHorizontal: 'auto',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
});
