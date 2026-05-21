import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MainTab} from '../types/app';
import {colors} from '../theme/colors';
import {floatingNavGap, floatingNavHeight} from '../theme/metrics';

type Props = {
  active: MainTab;
  onChange: (tab: MainTab) => void;
};

const tabs: {id: MainTab; label: string; icon: string}[] = [
  {id: 'prompter', label: 'Prompter', icon: '🎙️'},
  {id: 'workshop', label: 'Workshop', icon: '📖'},
  {id: 'history', label: 'History', icon: '📜'},
  {id: 'tips', label: 'Tips', icon: '💡'},
  {id: 'quiz', label: 'Quiz', icon: '❔'},
  {id: 'shop', label: 'Shop', icon: '🏺'},
];

export function FloatingTabBar({active, onChange}: Props): React.JSX.Element {
  return (
    <View style={styles.wrap}>
      {tabs.map(tab => {
        const isActive = tab.id === active;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={({pressed}) => [styles.item, isActive && styles.active, pressed && styles.pressed]}>
            <Text style={[styles.icon, isActive && styles.iconActive]} accessibilityLabel={tab.label}>
              {tab.icon}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: floatingNavGap,
    height: floatingNavHeight,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.overlay,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  item: {
    flex: 1,
    height: 58,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  active: {
    backgroundColor: colors.cardSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.8,
  },
  icon: {
    fontSize: 24,
    lineHeight: 30,
    opacity: 0.46,
    textAlign: 'center',
  },
  iconActive: {
    opacity: 1,
  },
});
