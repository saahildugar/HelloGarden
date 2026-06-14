import { ExpoConfig, ConfigContext } from 'expo/config';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env.local into process.env for app.config.ts
dotenv.config({ path: path.resolve(__dirname, 'env.local') });

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'HelloGarden',
  slug: 'hellogarden',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'hellogarden',
  userInterfaceStyle: 'automatic',
  // splash config handled by expo-splash-screen plugin
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.hellogarden.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FDF8F0',
    },
    package: 'com.hellogarden.app',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-font',
    'expo-secure-store',
    'expo-splash-screen',
    [
      'expo-camera',
      {
        cameraPermission: 'Allow HelloGarden to access your camera to identify plants and log garden photos.',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'Allow HelloGarden to access your photos to add plant images.',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/images/notification-icon.png',
        color: '#7C9A6E',
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: 'Allow HelloGarden to use your location to provide local weather and gardening advice.',
      },
    ],
    '@sentry/react-native/expo',
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    plantIdApiKey: process.env.PLANT_ID_API_KEY,
    openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
    geminiApiKey: process.env.GEMINI_API_KEY,
    powerSyncUrl: process.env.POWERSYNC_URL,
    sentryDsn: process.env.SENTRY_DSN,
    eas: {
      projectId: 'com.hellogarden.app',
    },
  },
});
