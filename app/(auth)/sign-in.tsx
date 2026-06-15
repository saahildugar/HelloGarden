import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, SCREEN_PADDING, Shadow } from '@/constants/Spacing';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';

// Required to complete the OAuth session in the browser
WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { signInWithEmail, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oauthLoading, setOauthLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setAppleAvailable);
  }, []);

  const handleSignIn = async () => {
    if (!email.trim() || !password) return;
    clearError();
    await signInWithEmail(email.trim().toLowerCase(), password);
    // Navigation handled by auth guard in _layout.tsx
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert(
        'Enter your email',
        'Type your email address in the field above, then tap "Forgot password?" to receive a reset link.',
        [{ text: 'OK' }]
      );
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: 'hellogarden://auth/reset-password',
    });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert(
        'Check your inbox',
        `We sent a password reset link to ${email.trim().toLowerCase()}. It may take a moment to arrive.`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleAppleSignIn = async () => {
    setAppleLoading(true);
    clearError();
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (!credential.identityToken) throw new Error('No identity token returned from Apple.');
      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });
      if (error) throw error;
      // Navigation handled by auth guard in _layout.tsx
    } catch (err: any) {
      if (err.code === 'ERR_REQUEST_CANCELED') return; // user dismissed — silent
      Alert.alert('Apple Sign-In failed', err.message ?? 'Please try again.');
    } finally {
      setAppleLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setOauthLoading(true);
    clearError();
    try {
      const redirectUri = makeRedirectUri({ scheme: 'hellogarden', path: 'auth/callback' });
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: redirectUri, skipBrowserRedirect: true },
      });
      if (error) throw error;
      if (!data.url) throw new Error('No OAuth URL returned');

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);

      if (result.type === 'success' && result.url) {
        const url = new URL(result.url);
        // Try hash fragment first (implicit flow), then query params
        const hashParams = new URLSearchParams(url.hash.substring(1));
        const queryParams = new URLSearchParams(url.search);
        const accessToken = hashParams.get('access_token') ?? queryParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token') ?? queryParams.get('refresh_token');

        if (accessToken && refreshToken) {
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        } else {
          // PKCE flow — exchange code
          const code = queryParams.get('code');
          if (code) {
            await supabase.auth.exchangeCodeForSession(result.url);
          }
        }
      }
    } catch (err: any) {
      // Google OAuth not yet configured — inform the user
      if (err.message?.includes('provider is not enabled')) {
        Alert.alert(
          'Google Sign-In not set up',
          'Enable Google OAuth in your Supabase dashboard to use this option.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Google Sign-In failed', err.message ?? 'Please try again.');
      }
    } finally {
      setOauthLoading(false);
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
          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            style={styles.backBtn}
            hitSlop={12}
          >
            <Ionicons name="arrow-back" size={22} color={theme.text} />
          </Pressable>

          {/* Logo */}
          <View style={styles.logoRow}>
            <View style={[styles.logoMark, { backgroundColor: Colors.sagePrimary }]}>
              <Ionicons name="leaf" size={14} color={Colors.white} />
            </View>
            <Text style={[styles.logoText, { color: theme.text }]}>HelloGarden</Text>
          </View>

          {/* Heading */}
          <View style={styles.headingBlock}>
            <Text style={[Typography.heading2, { color: theme.text }]}>Welcome back</Text>
            <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }]}>
              Sign in to sync your garden across devices.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Your password"
              isPassword
              autoComplete="current-password"
              returnKeyType="done"
              onSubmitEditing={handleSignIn}
            />

            {/* Error message */}
            {error && (
              <View style={[styles.errorBox, { backgroundColor: Colors.alertRedLight }]}>
                <Ionicons name="alert-circle-outline" size={16} color={Colors.alertRed} />
                <Text style={[Typography.label, { color: Colors.alertRed, flex: 1 }]}>{error}</Text>
              </View>
            )}

            {/* Forgot password */}
            <Pressable onPress={handleForgotPassword} style={styles.forgotBtn} hitSlop={8}>
              <Text style={[Typography.label, { color: Colors.sagePrimary }]}>Forgot password?</Text>
            </Pressable>

            <Button
              label="Sign In"
              onPress={handleSignIn}
              isLoading={isLoading && !oauthLoading}
              disabled={(isLoading || oauthLoading) || !email.trim() || !password}
              style={styles.signInBtn}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
            <Text style={[Typography.caption, { color: theme.textMuted, paddingHorizontal: Spacing.md }]}>
              or continue with
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
          </View>

          {/* Social buttons */}
          <View style={styles.socialBlock}>
            <Button
              variant="social"
              label="Continue with Google"
              onPress={handleGoogleSignIn}
              isLoading={oauthLoading}
              disabled={isLoading || oauthLoading || appleLoading}
              leftIcon={
                <Text style={styles.googleG}>G</Text>
              }
              style={[styles.socialBtn, Shadow.sm]}
            />
            {appleAvailable && (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={8}
                style={[styles.socialBtn, styles.appleBtn]}
                onPress={handleAppleSignIn}
              />
            )}
          </View>

          {/* Sign up link */}
          <View style={styles.footer}>
            <Pressable onPress={() => router.replace('/(auth)/sign-up')} hitSlop={8}>
              <Text style={[Typography.body, { color: theme.textSecondary, textAlign: 'center' }]}>
                Don&apos;t have an account?{' '}
                <Text style={{ color: Colors.sagePrimary, fontFamily: 'DMSans_600SemiBold' }}>
                  Sign up
                </Text>
              </Text>
            </Pressable>
            <Pressable onPress={() => router.replace('/(tabs)')} style={styles.skipBtn} hitSlop={8}>
              <Text style={[Typography.caption, { color: theme.textMuted, textAlign: 'center' }]}>
                Continue without an account
              </Text>
            </Pressable>
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
    paddingTop: Spacing.base,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoMark: {
    width: 26,
    height: 26,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 17,
    letterSpacing: -0.2,
  },
  headingBlock: {},
  form: {
    gap: Spacing.base,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: -Spacing.xs,
  },
  signInBtn: { width: '100%' },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },

  // Social
  socialBlock: {
    gap: Spacing.sm,
  },
  socialBtn: {
    width: '100%',
  },
  googleG: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    color: '#4285F4',
  },
  appleBtn: {
    height: 48,
  },

  // Footer
  footer: {
    gap: Spacing.sm,
  },
  skipBtn: {
    alignItems: 'center',
  },
});
