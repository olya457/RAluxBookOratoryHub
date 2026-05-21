import React, {ReactNode} from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {colors} from '../theme/colors';

type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'ghost' | 'gold' | 'danger';
  style?: ViewStyle | ViewStyle[];
};

export function AppButton({
  children,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
}: ButtonProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}>
      <Text style={[styles.text, variant === 'ghost' && styles.ghostText]} numberOfLines={1}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: colors.orange,
    shadowColor: colors.orange,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
  },
  gold: {
    backgroundColor: colors.goldSoft,
    shadowColor: colors.gold,
    shadowOpacity: 0.28,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
  },
  ghost: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.red,
  },
  disabled: {
    opacity: 0.42,
  },
  pressed: {
    transform: [{scale: 0.98}],
  },
  text: {
    color: colors.textBright,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0,
  },
  ghostText: {
    color: colors.muted,
  },
});
