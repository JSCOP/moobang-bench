import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useI18n } from '@/i18n/I18nContext';
import { colors, radius, spacing } from '@/theme';
import type { CommunityScore } from '@/hooks/useScores';

type VoteResponse = CommunityScore & { yourRating: number };

type VoteWidgetProps = {
  resultId: string;
  onVoted?: (score: CommunityScore) => void;
};

export function VoteWidget({ resultId, onVoted }: VoteWidgetProps) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saved' | 'failed'>('idle');

  useEffect(() => {
    const saved = window.localStorage.getItem(`voted:${resultId}`);
    const rating = Number(saved);
    if (Number.isInteger(rating) && rating >= 1 && rating <= 10) setSelected(rating);
  }, [resultId]);

  const vote = async (rating: number) => {
    setLoading(true);
    setStatus('idle');
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ resultId, rating }),
      });
      if (!response.ok) throw new Error('Vote request failed');
      const data = (await response.json()) as VoteResponse;
      setSelected(data.yourRating);
      window.localStorage.setItem(`voted:${resultId}`, String(data.yourRating));
      onVoted?.({ avg: data.avg, count: data.count });
      setStatus('saved');
    } catch {
      setStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('vote_prompt')}</Text>
      <View style={styles.buttons}>
        {Array.from({ length: 10 }, (_, index) => index + 1).map((rating) => (
          <Pressable
            key={rating}
            accessibilityRole="button"
            accessibilityState={{ selected: selected === rating, disabled: loading }}
            disabled={loading}
            onPress={() => void vote(rating)}
            style={[styles.button, selected === rating && styles.selected, loading && styles.disabled]}
          >
            <Text style={[styles.buttonText, selected === rating && styles.selectedText]}>{rating}</Text>
          </Pressable>
        ))}
      </View>
      {status === 'saved' ? <Text style={styles.success}>{t('vote_saved')}</Text> : null}
      {status === 'failed' ? <Text style={styles.failure}>{t('vote_failed')}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  title: { color: colors.text, fontSize: 15, fontWeight: '700' },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  button: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: radius.sm, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceRaised },
  selected: { backgroundColor: colors.accent, borderColor: colors.accent },
  disabled: { opacity: 0.6 },
  buttonText: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  selectedText: { color: colors.onAccent },
  success: { color: colors.ok, fontSize: 12 },
  failure: { color: colors.danger, fontSize: 12 },
});
