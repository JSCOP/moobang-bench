import { StyleSheet, View } from 'react-native';
import { colors, radius } from '@/theme';

export function DemoFrame({ resultId, height }: { resultId: string; height: number | string }) {
  return (
    <View style={styles.frame}>
      <iframe
        src={`/demos/${resultId}/index.html`}
        loading="lazy"
        sandbox="allow-scripts allow-pointer-lock"
        title={`${resultId} live demo`}
        style={{ display: 'block', width: '100%', height, border: 0, background: '#000' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { overflow: 'hidden', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: '#000' },
});
