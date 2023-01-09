import type { VirtualizedListWithoutRenderItemProps } from 'react-native';

import type { OptionType } from './types';

export type ItemLayout<T> = ReturnType<
    NonNullable<VirtualizedListWithoutRenderItemProps<T>['getItemLayout']>
>;

export type OnPressRemove<T> = (option: OptionType<T> | null) => void;

export type OnPressOptionType<T> = (option: OptionType<T>, optionIndex: number) => void;

export type OnPressSelectControlType = () => void;

export type OnOutsidePress = () => void;

export type OnChooseOption = () => void;
