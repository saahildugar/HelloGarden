import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing, BorderRadius, Shadow } from '@/constants/Spacing';
import { WeatherData, getWeatherIcon, getWeatherMessage } from '@/lib/weather';

interface WeatherWidgetProps {
  weather: WeatherData | null;
  isLoading: boolean;
  error: boolean;
  hasZip: boolean;
  onRetry?: () => void;
}

export function WeatherWidget({ weather, isLoading, error, hasZip, onRetry }: WeatherWidgetProps) {
  const theme = useTheme();

  // No ZIP code
  if (!hasZip) {
    return (
      <View style={[styles.card, Shadow.sm, { backgroundColor: theme.card }]}>
        <Ionicons name="location-outline" size={18} color={theme.textMuted} />
        <Text style={[Typography.label, { color: theme.textMuted, flex: 1 }]}>
          Add your ZIP code for local weather
        </Text>
      </View>
    );
  }

  // Loading skeleton
  if (isLoading && !weather) {
    return (
      <View style={[styles.card, Shadow.sm, { backgroundColor: theme.card }]}>
        <View style={[styles.skeleton, { backgroundColor: theme.border, width: 28, height: 28, borderRadius: 14 }]} />
        <View style={{ flex: 1, gap: 6 }}>
          <View style={[styles.skeleton, { backgroundColor: theme.border, width: 80, height: 14 }]} />
          <View style={[styles.skeleton, { backgroundColor: theme.border, width: 120, height: 10 }]} />
        </View>
      </View>
    );
  }

  // Error
  if (error && !weather) {
    return (
      <Pressable onPress={onRetry} style={[styles.card, Shadow.sm, { backgroundColor: theme.card }]}>
        <Ionicons name="cloud-offline-outline" size={18} color={theme.textMuted} />
        <Text style={[Typography.label, { color: theme.textMuted, flex: 1 }]}>
          Weather unavailable
        </Text>
        <Ionicons name="refresh" size={16} color={Colors.sagePrimary} />
      </Pressable>
    );
  }

  if (!weather) return null;

  const iconName = getWeatherIcon(weather.icon);
  const message = getWeatherMessage(weather);
  const description = weather.description.charAt(0).toUpperCase() + weather.description.slice(1);

  return (
    <View style={[styles.card, Shadow.sm, { backgroundColor: theme.card }]}>
      <View style={[styles.iconCircle, { backgroundColor: Colors.successLight }]}>
        <Ionicons name={iconName as any} size={20} color={Colors.sageDark} />
      </View>
      <View style={styles.weatherInfo}>
        <View style={styles.tempRow}>
          <Text style={[Typography.title, { color: theme.text }]}>{weather.temp}°F</Text>
          <Text style={[Typography.caption, { color: theme.textMuted, marginLeft: Spacing.sm }]}>
            Feels {weather.feelsLike}°
          </Text>
        </View>
        {message ? (
          <Text style={[Typography.caption, { color: weather.isRaining ? Colors.sagePrimary : Colors.alertRed, fontFamily: 'DMSans_600SemiBold' }]}>
            {message}
          </Text>
        ) : (
          <Text style={[Typography.caption, { color: theme.textSecondary }]}>
            {description}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.base,
    borderRadius: BorderRadius.xl,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherInfo: {
    flex: 1,
    gap: 2,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  skeleton: {
    borderRadius: BorderRadius.sm,
  },
});
