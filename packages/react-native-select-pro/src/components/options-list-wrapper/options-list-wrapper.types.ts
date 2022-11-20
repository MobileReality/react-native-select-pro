import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

type WrapperStyles = {
    wrapperStyles: StyleProp<ViewStyle>;
};

export type OptionsListWrapperProps = {
    children: ReactNode;
} & WrapperStyles;
