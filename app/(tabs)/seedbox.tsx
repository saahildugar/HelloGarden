import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/Typography';
import { SCREEN_PADDING } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';

export default function SeedBoxScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[Typography.heading2, { color: theme.text }]}>SeedBox</Text>
        <Text style={[Typography.body, { color: theme.textMuted, marginTop: 8 }]}>
          Subscription pitch → seed selection → subscriber dashboard
        </Text>
        <Text style={[Typography.caption, { color: Colors.sagePrimary, marginTop: 8 }]}>
          First box free · $14.99/mo + $3.99 shipping
        </Text>
        <Text style={[Typography.caption, { color: theme.textMuted, marginTop: 4 }]}>
          Built in Phase 5
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SCREEN_PADDING, flex: 1 },
});
