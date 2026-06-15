import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Spacing';

interface ProgressDotsProps {
  total: number;
  current: number; // 0-indexed
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === current
              ? { backgroundColor: Colors.sagePrimary, width: 22 }
              : i < current
              ? { backgroundColor: Colors.sageLight, width: 8 }
              : { backgroundColor: Colors.creamDeep, width: 8 },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  dot: {
    height: 8,
    borderRadius: BorderRadius.full,
  },
});
