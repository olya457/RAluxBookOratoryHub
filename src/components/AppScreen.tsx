import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {colors} from '../theme/colors';
import {contentBottomPadding, platformTopInset, screenHorizontalPadding} from '../theme/metrics';

type Props = {
  children: ReactNode;
  padded?: boolean;
};

export function AppScreen({children, padded = true}: Props): React.JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.content, padded && styles.padded]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    paddingTop: platformTopInset,
    paddingBottom: contentBottomPadding,
  },
  padded: {
    paddingHorizontal: screenHorizontalPadding,
  },
});
