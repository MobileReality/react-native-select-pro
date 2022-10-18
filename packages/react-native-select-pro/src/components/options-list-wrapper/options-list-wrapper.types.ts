import type { ComponentProps, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { OptionalToRequired } from '../../helpers';
import type { OptionsList } from '../options-list';

type FromOptionListComponentProps = Pick<
    ComponentProps<typeof OptionsList>,
    'animation' | 'isOpened'
>;

type WrapperStyles = {
    wrapperStyles: StyleProp<ViewStyle>;
};

export type OptionsListWrapperProps = OptionalToRequired<FromOptionListComponentProps> & {
    children: ReactNode;
} & WrapperStyles;
