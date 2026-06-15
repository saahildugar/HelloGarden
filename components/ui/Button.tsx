import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  StyleProp,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { BorderRadius, MIN_TOUCH_TARGET, Spacing } from '@/constants/Spacing';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'social';
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: TextStyle;
  leftIcon?: React.ReactNode;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  isLoading,
  disabled,
  style,
  labelStyle,
  leftIcon,
}: ButtonProps) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  const isSocial = variant === 'social';

  const buttonBg = isPrimary
    ? Colors.sagePrimary
    : isSocial
    ? Colors.white
    : 'transparent';

  const borderColor = isSecondary
    ? Colors.sagePrimary
    : isSocial
    ? theme.border
    : undefined;

  const labelColor = isPrimary
    ? Colors.white
    : isSecondary
    ? Colors.sagePrimary
    : isSocial
    ? theme.text
    : theme.text;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      style={[
        styles.base,
        { backgroundColor: buttonBg },
        (isSecondary || isSocial) && {
          borderWidth: 1.5,
          borderColor,
        },
        (disabled || isLoading) && styles.disabled,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={isPrimary ? Colors.white : Colors.sagePrimary} size="small" />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}
          <Text style={[Typography.button, { color: labelColor }, labelStyle]}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: MIN_TOUCH_TARGET + 4,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginRight: Spacing.sm,
  },
});
