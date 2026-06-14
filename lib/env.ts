import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export const ENV = {
  supabaseUrl: extra.supabaseUrl as string,
  supabaseAnonKey: extra.supabaseAnonKey as string,
  stripePublishableKey: extra.stripePublishableKey as string,
  plantIdApiKey: extra.plantIdApiKey as string,
  openWeatherApiKey: extra.openWeatherApiKey as string,
  geminiApiKey: extra.geminiApiKey as string,
  powerSyncUrl: extra.powerSyncUrl as string,
  sentryDsn: extra.sentryDsn as string,
} as const;
