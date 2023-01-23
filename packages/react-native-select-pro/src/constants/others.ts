import { NativeModules, Platform } from 'react-native';

// based on: https://github.com/callstack/react-native-paper/blob/main/src/constants.tsx
const statusBarHeight =
    NativeModules.NativeUnimoduleProxy?.modulesConstants?.ExponentConstants?.statusBarHeight ?? 0;

export const APPROX_STATUSBAR_HEIGHT: number = Platform.select({
    android: statusBarHeight,
    ios: Platform.Version < 11 ? statusBarHeight : 0,
});
