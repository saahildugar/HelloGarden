import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, SCREEN_PADDING } from '@/constants/Spacing';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { getZoneFromZip } from '@/lib/zones';
import type { ExperienceLevel, GardenType } from '@/types/database';

const EXPERIENCE_OPTIONS: { value: ExperienceLevel; label: string; emoji: string; desc: string }[] = [
  { value: 'beginner', label: 'Beginner', emoji: '🌱', desc: 'Just getting started' },
  { value: 'intermediate', label: 'Intermediate', emoji: '🪴', desc: 'Some experience' },
  { value: 'experienced', label: 'Experienced', emoji: '🌳', desc: 'Seasoned gardener' },
];

const GARDEN_TYPE_OPTIONS: { value: GardenType; label: string; emoji: string }[] = [
  { value: 'indoor', label: 'Indoor', emoji: '🏠' },
  { value: 'outdoor', label: 'Outdoor', emoji: '🏡' },
  { value: 'balcony', label: 'Balcony', emoji: '🪟' },
  { value: 'raised_bed', label: 'Raised Bed', emoji: '🌾' },
  { value: 'herbs', label: 'Herbs', emoji: '🌿' },
  { value: 'vegetables', label: 'Vegetables', emoji: '🥕' },
];

export default function SetupScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { zip, zone, experienceLevel, gardenTypes, setZip, setZone, setExperienceLevel, toggleGardenType } =
    useOnboardingStore();

  const [zipInput, setZipInput] = useState(zip);
  const [zipError, setZipError] = useState('');
  const [detectingZone, setDetectingZone] = useState(false);
  const zoneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canContinue =
    zipInput.length === 5 &&
    !zipError &&
    !detectingZone &&
    experienceLevel !== null &&
    gardenTypes.length > 0;

  // Auto-detect zone when ZIP reaches 5 digits
  useEffect(() => {
    if (zoneTimer.current) clearTimeout(zoneTimer.current);
    setZipError('');

    if (zipInput.length === 5 && /^\d{5}$/.test(zipInput)) {
      setDetectingZone(true);
      setZip(zipInput);
      setZone(null);

      zoneTimer.current = setTimeout(async () => {
        const detected = await getZoneFromZip(zipInput);
        setDetectingZone(false);
        if (detected) {
          setZone(detected);
        } else {
          setZipError('ZIP code not found. Try another.');
          setZone(null);
        }
      }, 600);
    } else if (zipInput.length === 5) {
      setZipError('Enter a valid 5-digit ZIP code.');
    } else if (zipInput.length > 0 && zone) {
      setZone(null);
    }

    return () => {
      if (zoneTimer.current) clearTimeout(zoneTimer.current);
    };
  }, [zipInput]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Progress */}
          <ProgressDots total={3} current={0} />

          {/* Heading */}
          <View style={styles.headingBlock}>
            <Text style={[Typography.heading2, { color: theme.text }]}>
              Set up your{'\n'}garden profile
            </Text>
            <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.sm }]}>
              We use this to personalize your care reminders, planting calendar, and seed suggestions.
            </Text>
          </View>

          {/* ZIP Code */}
          <View style={styles.section}>
            <Input
              label="Your ZIP code"
              hint="Used for your climate zone and local weather"
              value={zipInput}
              onChangeText={(t) => setZipInput(t.replace(/\D/g, '').slice(0, 5))}
              keyboardType="number-pad"
              maxLength={5}
              placeholder="e.g., 98052"
              error={zipError}
              returnKeyType="done"
              rightElement={
                detectingZone ? (
                  <ActivityIndicator size="small" color={Colors.sagePrimary} />
                ) : zone ? (
                  <View style={[styles.zoneBadge, { backgroundColor: Colors.successLight }]}>
                    <Ionicons name="location" size={12} color={Colors.sageDark} />
                    <Text style={[Typography.caption, { color: Colors.sageDark, fontFamily: 'DMSans_600SemiBold' }]}>
                      Zone {zone.toUpperCase()}
                    </Text>
                  </View>
                ) : null
              }
            />
          </View>

          {/* Experience Level */}
          <View style={styles.section}>
            <Text style={[Typography.label, { color: theme.textSecondary, marginBottom: Spacing.sm }]}>
              EXPERIENCE LEVEL
            </Text>
            <View style={styles.experienceGrid}>
              {EXPERIENCE_OPTIONS.map((opt) => {
                const selected = experienceLevel === opt.value;
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => setExperienceLevel(opt.value)}
                    style={[
                      styles.experienceCard,
                      {
                        backgroundColor: selected ? Colors.sagePrimary : theme.card,
                        borderColor: selected ? Colors.sagePrimary : theme.border,
                      },
                    ]}
                  >
                    <Text style={styles.experienceEmoji}>{opt.emoji}</Text>
                    <Text
                      style={[
                        Typography.bodyMedium,
                        { color: selected ? Colors.white : theme.text },
                      ]}
                    >
                      {opt.label}
                    </Text>
                    <Text
                      style={[
                        Typography.caption,
                        { color: selected ? Colors.white + 'CC' : theme.textMuted, marginTop: 2 },
                      ]}
                    >
                      {opt.desc}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Garden Types */}
          <View style={styles.section}>
            <Text style={[Typography.label, { color: theme.textSecondary, marginBottom: Spacing.xs }]}>
              WHAT DO YOU GROW?
            </Text>
            <Text style={[Typography.caption, { color: theme.textMuted, marginBottom: Spacing.md }]}>
              Select all that apply
            </Text>
            <View style={styles.chipsWrap}>
              {GARDEN_TYPE_OPTIONS.map((opt) => {
                const selected = gardenTypes.includes(opt.value);
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => toggleGardenType(opt.value)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: selected ? Colors.sagePrimary : theme.card,
                        borderColor: selected ? Colors.sagePrimary : theme.border,
                      },
                    ]}
                  >
                    <Text style={styles.chipEmoji}>{opt.emoji}</Text>
                    <Text
                      style={[
                        Typography.label,
                        { color: selected ? Colors.white : theme.text },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Continue */}
          <View style={styles.footer}>
            <Button
              label="Continue"
              onPress={() => router.push('/onboarding/create-garden')}
              disabled={!canContinue}
              style={styles.continueBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  headingBlock: {
    gap: 0,
  },
  section: {},

  // Zone badge
  zoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },

  // Experience
  experienceGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  experienceCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  experienceEmoji: {
    fontSize: 24,
    marginBottom: 2,
  },

  // Garden type chips
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
  },
  chipEmoji: {
    fontSize: 15,
  },

  // Footer
  footer: {
    marginTop: Spacing.sm,
  },
  continueBtn: {
    width: '100%',
  },
});
