import {Platform, StatusBar} from 'react-native';

export const screenTopGap = Platform.OS === 'android' ? 30 : 20;
export const platformTopInset = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + screenTopGap : screenTopGap;
export const floatingNavGap = Platform.OS === 'android' ? 30 : 20;
export const floatingNavHeight = 68;
export const screenHorizontalPadding = 20;
export const floatingNavTop = floatingNavHeight + floatingNavGap;
export const contentBottomPadding = floatingNavTop + 26;
export const actionBarBottom = floatingNavTop + 18;
