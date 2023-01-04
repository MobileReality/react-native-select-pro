import type { VirtualizedListWithoutRenderItemProps } from 'react-native';
import type { SectionListData } from 'react-native';

import type { OptionType } from '../types';

export type ItemLayout<T> = ReturnType<
    NonNullable<VirtualizedListWithoutRenderItemProps<T>['getItemLayout']>
>;

export type RenderItemProps<T> = {
    item: OptionType;
    index: number;
    section?: SectionListData<T>;
};

export type OnPressRemove = (option?: OptionType | null) => void;

export type OptionComponentType = {
    isSelected: boolean;
    option: OptionType;
    optionIndex: number;
};

export type OnPressOptionType<T> = (option: OptionType<T>, optionIndex: number) => void;

export type OnPressSelectControlType = () => void;

export type OnOutsidePress = () => void;

export type OnChooseOption = () => void;
