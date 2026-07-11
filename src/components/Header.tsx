import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useI18n } from '@/i18n/I18nContext';
import { colors, contentMaxWidth, spacing } from '@/theme';
import { LangToggle } from './LangToggle';

const navItems = [
  { href: '/benchmarks' as const, label: 'nav_benchmarks' },
  { href: '/leaderboard' as const, label: 'nav_leaderboard' },
  { href: '/about' as const, label: 'nav_about' },
];

export function Header() {
  const { t } = useI18n();
  return (
    <View style={styles.shell}>
      <View style={styles.inner}>
        <Link href="/" asChild>
          <Pressable accessibilityRole="link">
            <Text style={styles.logo}>Moobang<Text style={styles.logoAccent}>Bench</Text></Text>
          </Pressable>
        </Link>
        <View style={styles.right}>
          <View style={styles.nav}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} asChild>
                <Pressable accessibilityRole="link" style={styles.navLink}>
                  <Text style={styles.navText}>{t(item.label)}</Text>
                </Pressable>
              </Link>
            ))}
          </View>
          <LangToggle />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.background },
  inner: { width: '100%', maxWidth: contentMaxWidth, marginHorizontal: 'auto', paddingHorizontal: spacing.md, paddingVertical: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, flexWrap: 'wrap' },
  logo: { color: colors.text, fontSize: 22, fontWeight: '900', letterSpacing: -0.6 },
  logoAccent: { color: colors.cyan },
  right: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flexWrap: 'wrap' },
  nav: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, flexWrap: 'wrap' },
  navLink: { paddingHorizontal: spacing.sm, paddingVertical: spacing.sm },
  navText: { color: colors.muted, fontWeight: '700', fontSize: 14 },
});
