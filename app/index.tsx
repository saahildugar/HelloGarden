import { Redirect } from 'expo-router';

/**
 * App entry point.
 * Redirects to the main tabs. Auth/onboarding guards are handled
 * by the tab layout once auth state is wired up in Phase 2.
 */
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
