import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, SCREEN_PADDING } from '@/constants/Spacing';
import { Button } from '@/components/ui/Button';

const FEATURES = [
  {
    icon: 'leaf-outline' as const,
    label: 'Track every plant, never miss watering',
  },
  {
    icon: 'camera-outline' as const,
    label: 'Identify any plant instantly with your camera',
  },
  {
    icon: 'cube-outline' as const,
    label: 'Get curated seeds delivered to your door monthly',
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={styles.container}>

        {/* === Branding === */}
        <View style={styles.brandRow}>
          <View style={[styles.logoMark, { backgroundColor: Colors.sagePrimary }]}>
            <Ionicons name="leaf" size={18} color={Colors.white} />
          </View>
          <Text style={[styles.logoText, { color: theme.text }]}>HelloGarden</Text>
        </View>

        {/* === Illustration === */}
        <View style={styles.illustrationArea}>
          {/* Background rings */}
          <View style={[styles.ringOuter, { backgroundColor: Colors.successLight }]} />
          <View style={[styles.ringMid, { backgroundColor: Colors.creamDark }]} />
          <View style={[styles.ringInner, { backgroundColor: Colors.sageLight + '30' }]} />

          {/* Plant emojis */}
          <Text style={styles.plantMain}>🪴</Text>
          <Text style={[styles.plantAccent, styles.plantLeft]}>🌿</Text>
          <Text style={[styles.plantAccent, styles.plantRight]}>🌸</Text>
          <Text style={[styles.plantAccent, styles.plantBtm]}>🌱</Text>
        </View>

        {/* === Headline === */}
        <View style={styles.headlineBlock}>
          <Text style={[Typography.heading2, { color: theme.text, textAlign: 'center' }]}>
            Your garden starts here.
          </Text>
          <Text
            style={[
              Typography.body,
              {
                color: theme.textSecondary,
                textAlign: 'center',
                marginTop: Spacing.sm,
                lineHeight: 22,
              },
            ]}
          >
            The free app that makes plant care simple, beautiful, and fun — for any gardener, any garden.
          </Text>
        </View>

        {/* === Feature bullets === */}
        <View style={[styles.featureCard, { backgroundColor: theme.card }]}>
          {FEATURES.map((f, i) => (
            <View key={i} style={[styles.featureRow, i < FEATURES.length - 1 && styles.featureDivider]}>
              <View style={[styles.featureIcon, { backgroundColor: Colors.successLight }]}>
                <Ionicons name={f.icon} size={16} color={Colors.sageDark} />
              </View>
              <Text style={[Typography.bodyMedium, { color: theme.text, flex: 1 }]}>
                {f.label}
              </Text>
            </View>
          ))}
        </View>

        {/* === CTAs === */}
        <View style={styles.ctaBlock}>
          <Button
            label="Get Started"
            onPress={() => router.push('/onboarding/setup')}
            style={styles.primaryBtn}
          />

          <Pressable
            onPress={() => router.push('/(auth)/sign-in')}
            style={styles.signInLink}
            hitSlop={12}
          >
            <Text style={[Typography.body, { color: theme.textSecondary }]}>
              Already have an account?{' '}
              <Text style={{ color: Colors.sagePrimary, fontFamily: 'DMSans_600SemiBold' }}>
                Sign in
              </Text>
            </Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const RING_SIZE = 220;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.base,
    justifyContent: 'space-between',
  },

  // Branding
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  logoMark: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 22,
    letterSpacing: -0.3,
  },

  // Illustration
  illustrationArea: {
    alignItems: 'center',
    justifyContent: 'center',
    height: RING_SIZE + 20,
  },
  ringOuter: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    opacity: 0.5,
  },
  ringMid: {
    position: 'absolute',
    width: RING_SIZE * 0.75,
    height: RING_SIZE * 0.75,
    borderRadius: (RING_SIZE * 0.75) / 2,
  },
  ringInner: {
    position: 'absolute',
    width: RING_SIZE * 0.5,
    height: RING_SIZE * 0.5,
    borderRadius: (RING_SIZE * 0.5) / 2,
    backgroundColor: Colors.sagePrimary + '15',
  },
  plantMain: {
    fontSize: 72,
    position: 'absolute',
  },
  plantAccent: {
    fontSize: 28,
    position: 'absolute',
  },
  plantLeft: {
    left: '15%',
    top: '22%',
    transform: [{ rotate: '-20deg' }],
  },
  plantRight: {
    right: '14%',
    top: '18%',
    transform: [{ rotate: '15deg' }],
  },
  plantBtm: {
    bottom: '14%',
    right: '22%',
    transform: [{ rotate: '10deg' }],
  },

  // Headline
  headlineBlock: {
    paddingHorizontal: Spacing.sm,
  },

  // Feature card
  featureCard: {
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  featureDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.creamDeep,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // CTAs
  ctaBlock: {
    gap: Spacing.base,
  },
  primaryBtn: {
    width: '100%',
  },
  signInLink: {
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
});
