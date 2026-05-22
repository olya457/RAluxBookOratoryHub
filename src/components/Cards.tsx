import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {useCompactScreen} from '../theme/useCompactScreen';

type Props = {
  icon?: string;
  title: string;
  subtitle?: string;
  meta?: string;
  tone?: 'orange' | 'gold' | 'red' | 'green';
  onPress?: () => void;
  right?: React.ReactNode;
  selected?: boolean;
};

const toneColors = {
  orange: colors.orange,
  gold: colors.gold,
  red: colors.red,
  green: colors.green,
};

export function InfoCard({
  icon,
  title,
  subtitle,
  meta,
  tone = 'orange',
  onPress,
  right,
  selected = false,
}: Props): React.JSX.Element {
  const compact = useCompactScreen();
  const content = (
    <>
      {icon ? (
        <View style={[styles.iconBox, compact && styles.iconBoxCompact, {backgroundColor: selected ? toneColors[tone] : colors.panelSoft}]}>
          <Text style={[styles.icon, compact && styles.iconCompact]}>{icon}</Text>
        </View>
      ) : null}
      <View style={styles.content}>
        {meta ? <Text style={[styles.meta, compact && styles.metaCompact, {color: toneColors[tone]}]}>{meta}</Text> : null}
        <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitle, compact && styles.subtitleCompact]} numberOfLines={3}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : onPress ? <Text style={[styles.chevron, compact && styles.chevronCompact, {color: toneColors[tone]}]}>›</Text> : null}
    </>
  );
  const cardStyle = [
    styles.card,
    compact && styles.cardCompact,
    selected && styles.selected,
    {borderColor: selected ? toneColors[tone] : tone === 'gold' ? colors.borderGold : tone === 'red' ? colors.borderRed : colors.border},
  ];

  if (!onPress) {
    return <View style={cardStyle}>{content}</View>;
  }

  return (
    <Pressable onPress={onPress} style={({pressed}) => [cardStyle, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 86,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 14,
  },
  cardCompact: {
    minHeight: 74,
    padding: 12,
    marginBottom: 12,
  },
  selected: {
    backgroundColor: colors.cardSoft,
  },
  pressed: {
    opacity: 0.82,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconBoxCompact: {
    width: 42,
    height: 42,
    borderRadius: 11,
    marginRight: 12,
  },
  icon: {
    fontSize: 25,
  },
  iconCompact: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  meta: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  metaCompact: {
    fontSize: 9,
    marginBottom: 4,
  },
  title: {
    color: colors.textBright,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 21,
  },
  titleCompact: {
    fontSize: 15,
    lineHeight: 19,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
    marginTop: 5,
  },
  subtitleCompact: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  chevron: {
    fontSize: 28,
    marginLeft: 10,
  },
  chevronCompact: {
    fontSize: 24,
    marginLeft: 8,
  },
  right: {
    marginLeft: 10,
  },
});
