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

WebBrowser.maybeCompleteAuthSession();

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SignUpScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { signUpWithEmail, isLoading, error, clearError } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oauthLoading, setOauthLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setAppleAvailable);
  }, []);

  // Field-level errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const validate = (): boolean => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setConfirmError('');

    if (!email.trim() || !validateEmail(email.trim())) {
      setEmailError('Enter a valid email address.');
      valid = false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      valid = false;
    }
    return valid;
  };

  const handleSignUp = async () => {
    clearError();
    if (!validate()) return;
    await signUpWithEmail(email.trim().toLowerCase(), password, fullName.trim() || undefined);
    // If no error after signUp, the user receives a confirmation email.
    // Supabase by default requires email confirmation.
    // We'll show a success alert and navigate to sign-in.
    const storeError = useAuthStore.getState().error;
    if (!storeError) {
      Alert.alert(
        'Check your inbox!',
        `We sent a confirmation link to ${email.trim().toLowerCase()}. Click the link to activate your account, then sign in.`,
        [{ text: 'Go to Sign In', onPress: () => router.replace('/(auth)/sign-in') }]
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
        const hashParams = new URLSearchParams(url.hash.substring(1));
        const queryParams = new URLSearchParams(url.search);
        const accessToken = hashParams.get('access_token') ?? queryParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token') ?? queryParams.get('refresh_token');

        if (accessToken && refreshToken) {
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        } else {
          const code = queryParams.get('code');
          if (code) {
            await supabase.auth.exchangeCodeForSession(result.url);
          }
        }
      }
    } catch (err: any) {
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
          {/* Back */}
          <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
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
            <Text style={[Typography.heading2, { color: theme.text }]}>Create your account</Text>
            <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.xs }]}>
              Required for SeedBox subscriptions and syncing across devices.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Full name (optional)"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Your name"
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
            />

            <Input
              label="Email"
              value={email}
              onChangeText={(t) => { setEmail(t); setEmailError(''); }}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
              error={emailError}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={(t) => { setPassword(t); setPasswordError(''); }}
              placeholder="At least 8 characters"
              isPassword
              autoComplete="new-password"
              returnKeyType="next"
              error={passwordError}
            />

            <Input
              label="Confirm password"
              value={confirmPassword}
              onChangeText={(t) => { setConfirmPassword(t); setConfirmError(''); }}
              placeholder="Re-enter your password"
              isPassword
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={handleSignUp}
              error={confirmError}
            />

            {/* Supabase error */}
            {error && (
              <View style={[styles.errorBox, { backgroundColor: Colors.alertRedLight }]}>
                <Ionicons name="alert-circle-outline" size={16} color={Colors.alertRed} />
                <Text style={[Typography.label, { color: Colors.alertRed, flex: 1 }]}>{error}</Text>
              </View>
            )}

            <Button
              label="Create Account"
              onPress={handleSignUp}
              isLoading={isLoading && !oauthLoading}
              disabled={(isLoading || oauthLoading) || !email.trim() || !password || !confirmPassword}
              style={styles.createBtn}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
            <Text style={[Typography.caption, { color: theme.textMuted, paddingHorizontal: Spacing.md }]}>
              or
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
          </View>

          {/* Social */}
          <View style={styles.socialBlock}>
            <Button
              variant="social"
              label="Continue with Google"
              onPress={handleGoogleSignIn}
              isLoading={oauthLoading}
              disabled={isLoading || oauthLoading || appleLoading}
              leftIcon={<Text style={styles.googleG}>G</Text>}
              style={[styles.socialBtn, Shadow.sm]}
            />
            {appleAvailable && (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={8}
                style={[styles.socialBtn, styles.appleBtn]}
                onPress={handleAppleSignIn}
              />
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[Typography.caption, { color: theme.textMuted, textAlign: 'center', lineHeight: 18 }]}>
              By creating an account, you agree to our{' '}
              <Text style={{ color: Colors.sagePrimary }}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={{ color: Colors.sagePrimary }}>Privacy Policy</Text>.
            </Text>

            <Pressable onPress={() => router.replace('/(auth)/sign-in')} hitSlop={8}>
              <Text style={[Typography.body, { color: theme.textSecondary, textAlign: 'center' }]}>
                Already have an account?{' '}
                <Text style={{ color: Colors.sagePrimary, fontFamily: 'DMSans_600SemiBold' }}>
                  Sign in
                </Text>
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
  createBtn: { width: '100%' },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  socialBlock: {
    gap: Spacing.sm,
  },
  socialBtn: { width: '100%' },
  googleG: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    color: '#4285F4',
  },
  appleBtn: {
    height: 48,
  },
  footer: {
    gap: Spacing.md,
  },
});
