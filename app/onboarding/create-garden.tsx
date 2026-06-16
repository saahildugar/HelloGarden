import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, SCREEN_PADDING, Shadow } from '@/constants/Spacing';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';
import type { GardenType } from '@/types/database';

const EMOJI_OPTIONS = ['🌱', '🌿', '🏡', '🪴', '🌾', '🌸', '🥕', '🌻', '🍅', '🌹'];

// Map garden type to primary GardenType for the garden record
function primaryGardenType(types: GardenType[]): GardenType {
  if (types.includes('outdoor')) return 'outdoor';
  if (types.includes('indoor')) return 'indoor';
  if (types.includes('vegetables')) return 'vegetables';
  if (types.includes('herbs')) return 'herbs';
  if (types.includes('raised_bed')) return 'raised_bed';
  if (types.includes('balcony')) return 'balcony';
  return types[0] ?? 'outdoor';
}

export default function CreateGardenScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { zip, zone, experienceLevel, gardenTypes, reset } = useOnboardingStore();
  const { session, signInAnonymously, setOnboardingComplete } = useAuthStore();

  const [gardenName, setGardenName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌱');
  const [isCreating, setIsCreating] = useState(false);
  const [nameError, setNameError] = useState('');

  const canCreate = gardenName.trim().length >= 2 && !isCreating;

  const handleCreate = async () => {
    if (!canCreate) return;
    const trimmedName = gardenName.trim();
    if (trimmedName.length < 2) {
      setNameError('Garden name must be at least 2 characters.');
      return;
    }
    setNameError('');
    setIsCreating(true);

    try {
      // 1. Create session if user doesn't already have one (e.g. from email sign-in)
      if (!session) {
        await signInAnonymously();
      }

      // 2. Get the current user
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 3. Update profile with onboarding data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any).from('profiles').update({
          zip_code: zip || null,
          usda_zone: zone || null,
          experience_level: experienceLevel ?? undefined,
          garden_types: gardenTypes,
          onboarding_complete: true,
        }).eq('id', user.id);

        // 3b. Refresh in-memory profile so dashboard has ZIP for weather
        await useAuthStore.getState().fetchProfile();

        // 4. Create first garden
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any).from('gardens').insert({
          user_id: user.id,
          name: trimmedName,
          type: primaryGardenType(gardenTypes),
          emoji_icon: selectedEmoji,
        });
      }

      // 5. Mark onboarding complete locally (even if Supabase failed)
      await setOnboardingComplete();

      // 6. Reset onboarding temp state
      reset();

      // 7. Navigate to main app
      router.replace('/(tabs)');
    } catch (err) {
      // If anonymous auth isn't enabled or network fails, still complete onboarding locally
      await setOnboardingComplete();
      reset();
      router.replace('/(tabs)');
    } finally {
      setIsCreating(false);
    }
  };

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
          <ProgressDots total={3} current={2} />

          {/* Heading */}
          <View style={styles.headingBlock}>
            <Text style={[Typography.heading2, { color: theme.text }]}>
              Create your{'\n'}first garden
            </Text>
            <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.sm }]}>
              Give it a name you'll recognize. You can add more gardens anytime.
            </Text>
          </View>

          {/* Emoji Picker */}
          <View style={styles.section}>
            <Text style={[Typography.label, { color: theme.textSecondary, marginBottom: Spacing.md }]}>
              CHOOSE AN ICON
            </Text>
            <View style={styles.emojiGrid}>
              {EMOJI_OPTIONS.map((emoji) => {
                const selected = selectedEmoji === emoji;
                return (
                  <Pressable
                    key={emoji}
                    onPress={() => setSelectedEmoji(emoji)}
                    style={[
                      styles.emojiCell,
                      Shadow.sm,
                      {
                        backgroundColor: selected ? Colors.sagePrimary : theme.card,
                        borderColor: selected ? Colors.sagePrimary : theme.border,
                      },
                    ]}
                  >
                    <Text style={styles.emojiText}>{emoji}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Preview */}
          <View style={[styles.previewCard, Shadow.md, { backgroundColor: theme.card }]}>
            <View style={[styles.previewIcon, { backgroundColor: Colors.successLight }]}>
              <Text style={styles.previewEmoji}>{selectedEmoji}</Text>
            </View>
            <View style={styles.previewText}>
              <Text
                style={[
                  Typography.title,
                  { color: gardenName.trim() ? theme.text : theme.textMuted },
                ]}
                numberOfLines={1}
              >
                {gardenName.trim() || 'Your Garden Name'}
              </Text>
              {zone && (
                <Text style={[Typography.caption, { color: theme.textMuted, marginTop: 2 }]}>
                  Zone {zone.toUpperCase()} · {gardenTypes.map((t) => t.replace('_', ' ')).join(', ')}
                </Text>
              )}
            </View>
          </View>

          {/* Name Input */}
          <View style={styles.section}>
            <Input
              label="Garden name"
              value={gardenName}
              onChangeText={setGardenName}
              placeholder="e.g., Backyard, Kitchen Herbs, Balcony..."
              maxLength={40}
              error={nameError}
              returnKeyType="done"
              onSubmitEditing={handleCreate}
              autoFocus
            />
          </View>

          {/* Create Button */}
          <View style={styles.footer}>
            <Button
              label="Create My Garden"
              onPress={handleCreate}
              disabled={!canCreate}
              isLoading={isCreating}
              style={styles.createBtn}
            />
            <Text style={[Typography.caption, { color: theme.textMuted, textAlign: 'center', marginTop: Spacing.md }]}>
              Your data syncs across devices when you sign in
            </Text>
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
  headingBlock: {},
  section: {},

  // Emoji grid
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  emojiCell: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 26,
  },

  // Preview card
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  previewIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewEmoji: {
    fontSize: 28,
  },
  previewText: {
    flex: 1,
  },

  // Footer
  footer: {},
  createBtn: { width: '100%' },
});
