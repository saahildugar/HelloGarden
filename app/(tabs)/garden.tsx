import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/Typography';
import { SCREEN_PADDING } from '@/constants/Spacing';

export default function GardenScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[Typography.heading2, { color: theme.text }]}>My Gardens</Text>
        <Text style={[Typography.body, { color: theme.textMuted, marginTop: 8 }]}>
          Garden cards → plant grid → plant detail
        </Text>
        <Text style={[Typography.caption, { color: theme.textMuted, marginTop: 8 }]}>
          Built in Phase 3
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SCREEN_PADDING, flex: 1 },
});
