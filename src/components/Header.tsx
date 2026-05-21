import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {useCompactScreen} from '../theme/useCompactScreen';
import {Eyebrow, Title} from './Typography';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

export function Header({eyebrow, title, subtitle, icon, onBack, right}: Props): React.JSX.Element {
  const compact = useCompactScreen();

  return (
    <View style={[styles.wrap, compact && styles.wrapCompact]}>
      <View style={[styles.row, compact && styles.rowCompact]}>
        {onBack ? (
          <Pressable onPress={onBack} style={[styles.round, compact && styles.roundCompact]}>
            <Text style={styles.roundText}>‹</Text>
          </Pressable>
        ) : null}
        <View style={styles.textBlock}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Title numberOfLines={2} style={[styles.title, compact ? styles.titleCompact : undefined]}>
            {icon ? `${icon} ` : ''}
            {title}
          </Title>
          {subtitle ? <Text style={[styles.subtitle, compact && styles.subtitleCompact]}>{subtitle}</Text> : null}
        </View>
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 18,
  },
  wrapCompact: {
    paddingBottom: 12,
  },
  row: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCompact: {
    minHeight: 42,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    marginTop: 4,
  },
  titleCompact: {
    fontSize: 24,
    lineHeight: 29,
  },
  subtitle: {
    color: colors.dim,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    lineHeight: 20,
  },
  subtitleCompact: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  round: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },
  roundCompact: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  roundText: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 28,
  },
  right: {
    marginLeft: 12,
  },
});
