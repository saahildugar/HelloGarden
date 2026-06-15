import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { BorderRadius, Spacing, MIN_TOUCH_TARGET } from '@/constants/Spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: ViewStyle;
  rightElement?: React.ReactNode;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  hint,
  containerStyle,
  rightElement,
  isPassword,
  ...props
}: InputProps) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const hasError = Boolean(error);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[Typography.label, { color: theme.textSecondary, marginBottom: Spacing.xs }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: hasError ? Colors.alertRed : theme.border,
            backgroundColor: Colors.white,
          },
        ]}
      >
        <RNTextInput
          style={[styles.input, Typography.body, { color: theme.text }]}
          placeholderTextColor={theme.textMuted}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize={isPassword ? 'none' : props.autoCapitalize}
          autoCorrect={isPassword ? false : props.autoCorrect}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword((v) => !v)}
            style={styles.eyeButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={theme.textMuted}
            />
          </TouchableOpacity>
        )}
        {rightElement && !isPassword && (
          <View style={styles.rightElement}>{rightElement}</View>
        )}
      </View>
      {hint && !error && (
        <Text style={[Typography.caption, { color: theme.textMuted, marginTop: Spacing.xs }]}>
          {hint}
        </Text>
      )}
      {error && (
        <Text style={[Typography.caption, { color: Colors.alertRed, marginTop: Spacing.xs }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    minHeight: MIN_TOUCH_TARGET + 4,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
  },
  eyeButton: {
    paddingLeft: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  rightElement: {
    paddingLeft: Spacing.sm,
  },
});
