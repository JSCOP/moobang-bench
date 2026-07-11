import { Link, usePathname } from 'expo-router';
import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getBenchmarks } from '@/data';
import { useI18n } from '@/i18n/I18nContext';
import { colors, spacing } from '@/theme';
import { LangToggle } from './LangToggle';

type NavItem = { href: '/' | '/benchmarks' | '/leaderboard' | '/apps-agents' | '/about' | '/privacy'; label: string };

const exploreItems: NavItem[] = [
  { href: '/', label: 'nav_home' },
  { href: '/benchmarks', label: 'nav_benchmarks' },
  { href: '/about', label: 'nav_about' },
  { href: '/privacy', label: 'nav_privacy' },
];

const rankingItems: NavItem[] = [
  { href: '/leaderboard', label: 'nav_leaderboard' },
  { href: '/apps-agents', label: 'nav_apps_agents' },
];


function Logo() {
  return (
    <Link href="/" asChild>
      <Pressable accessibilityRole="link" style={styles.logoRow}>
        <View style={styles.logoMark}>
          <Text style={styles.logoMarkText}>M</Text>
        </View>
        <Text style={styles.logo}>MoobangBench</Text>
      </Pressable>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();
  const pathname = usePathname();
  const benchmarks = getBenchmarks();

  return (
    <View style={styles.navBody}>
      <Text style={styles.sectionLabel}>{t('nav_explore')}</Text>
      {exploreItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} asChild>
            <Pressable
              accessibilityRole="link"
              onPress={onNavigate}
              style={StyleSheet.flatten([styles.navLink, active && styles.navLinkActive])}
            >
              <Text style={[styles.navText, active && styles.navTextActive]}>{t(item.label)}</Text>
            </Pressable>
          </Link>
        );
      })}

      <Text style={[styles.sectionLabel, styles.sectionGap]}>{t('nav_rankings').toUpperCase()}</Text>
      {rankingItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} asChild>
            <Pressable
              accessibilityRole="link"
              onPress={onNavigate}
              style={StyleSheet.flatten([styles.navLink, active && styles.navLinkActive])}
            >
              <Text style={[styles.navText, active && styles.navTextActive]}>{t(item.label)}</Text>
            </Pressable>
          </Link>
        );
      })}

      <Text style={[styles.sectionLabel, styles.sectionGap]}>{t('nav_benchmarks').toUpperCase()}</Text>
      {benchmarks.map((benchmark) => {
        const active = pathname === `/benchmarks/${benchmark.id}`;
        return (
          <Link key={benchmark.id} href={{ pathname: '/benchmarks/[id]', params: { id: benchmark.id } }} asChild>
            <Pressable
              accessibilityRole="link"
              onPress={onNavigate}
              style={StyleSheet.flatten([styles.navLink, active && styles.navLinkActive])}
            >
              <Text numberOfLines={1} style={[styles.navText, active && styles.navTextActive]}>{benchmark.title}</Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

export function Sidebar() {
  const { t } = useI18n();
  return (
    <aside className="mb-sidebar">
      <View style={styles.rail}>
        <View style={styles.railTop}>
          <Logo />
        </View>
        <NavLinks />
        <View style={styles.railBottom}>
          <LangToggle />
          <Link href="/privacy" asChild>
            <Pressable accessibilityRole="link">
              <Text style={styles.footerLink}>{t('nav_privacy')}</Text>
            </Pressable>
          </Link>
          <Text style={styles.footerText}>© 2026 MoobangBench</Text>
          <Text style={styles.footerText}>{t('footer_copy')}</Text>
        </View>
      </View>
    </aside>
  );
}

export function MobileBar() {
  const { t } = useI18n();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <div className="mb-mobilebar">
      <View style={styles.mobileInner}>
        <Logo />
        <View style={styles.mobileRight}>
          <LangToggle />
          <details ref={menuRef} className="mb-menu" style={{ position: 'relative' }}>
            <summary aria-label={t('nav_menu')}>{t('nav_menu')} ☰</summary>
            <View style={styles.mobileMenu}>
              <NavLinks onNavigate={closeMenu} />
            </View>
          </details>
        </View>
      </View>
    </div>
  );
}

const styles = StyleSheet.create({
  rail: { flexGrow: 1, minHeight: '100%', paddingVertical: spacing.lg, justifyContent: 'flex-start' },
  railTop: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  railBottom: { marginTop: 'auto', paddingHorizontal: spacing.lg, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, gap: spacing.sm, alignItems: 'flex-start' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoMark: { width: 24, height: 24, borderRadius: 6, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  logoMarkText: { color: colors.onAccent, fontSize: 14, fontWeight: '800', lineHeight: 16 },
  logo: { color: colors.text, fontSize: 15, fontWeight: '800', letterSpacing: -0.2 },
  navBody: { paddingHorizontal: spacing.sm, paddingVertical: spacing.lg, gap: 2 },
  sectionLabel: { color: colors.faint, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.2, paddingHorizontal: spacing.sm, marginBottom: spacing.xs },
  sectionGap: { marginTop: spacing.xl },
  navLink: { paddingHorizontal: spacing.sm, paddingVertical: 7, borderRadius: 6, borderLeftWidth: 2, borderLeftColor: 'transparent' },
  navLinkActive: { backgroundColor: colors.surfaceRaised, borderLeftColor: colors.accent },
  navText: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  navTextActive: { color: colors.text },
  footerText: { color: colors.faint, fontSize: 11, lineHeight: 16 },
  footerLink: { color: colors.muted, fontSize: 11, fontWeight: '600' },
  mobileInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.md },
  mobileRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  mobileMenu: { position: 'absolute', top: 40, right: 0, width: 240, backgroundColor: colors.bgSidebar, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingVertical: spacing.sm, boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)' },
});
