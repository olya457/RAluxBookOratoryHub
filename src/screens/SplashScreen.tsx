import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {images} from '../assets/images';
import {colors} from '../theme/colors';

export function SplashScreen(): React.JSX.Element {
  return (
    <View style={styles.root}>
      <ImageBackground source={images.loader} resizeMode="cover" style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  image: {
    flex: 1,
  },
});
