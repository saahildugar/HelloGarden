import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/Typography';
import { SCREEN_PADDING } from '@/constants/Spacing';

export default function ExploreScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[Typography.heading2, { color: theme.text }]}>Explore</Text>
        <Text style={[Typography.body, { color: theme.textMuted, marginTop: 8 }]}>
          Encyclopedia · Plant ID · AI Chatbot · Seasonal Calendar
        </Text>
        <Text style={[Typography.caption, { color: theme.textMuted, marginTop: 8 }]}>
          Built in Phases 3 & 4
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SCREEN_PADDING, flex: 1 },
});
