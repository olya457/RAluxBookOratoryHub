import React, {ReactNode} from 'react';
import {Platform, StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {colors} from '../theme/colors';

type TextProps = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
};

export function Eyebrow({children, style, numberOfLines}: TextProps): React.JSX.Element {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.eyebrow, style]}>
      {children}
    </Text>
  );
}

export function Title({children, style, numberOfLines}: TextProps): React.JSX.Element {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.title, style]}>
      {children}
    </Text>
  );
}

export function Body({children, style, numberOfLines}: TextProps): React.JSX.Element {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.body, style]}>
      {children}
    </Text>
  );
}

export const serifFont = Platform.select({ios: 'Georgia', android: 'serif', default: undefined});

const styles = StyleSheet.create({
  eyebrow: {
    color: colors.orange,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textBright,
    fontFamily: serifFont,
    fontSize: 27,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 32,
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
  },
});
