import type { FlatListProps } from 'react-native';

import type { OptionalToRequired, OptionType, SelectProps } from '../../types';

export type FlatOptionsListProps<T> = {
    resolvedData: OptionType<T>[];
    renderItem: FlatListProps<OptionType<T>>['renderItem'];
    getItemLayout: FlatListProps<OptionType<T>>['getItemLayout'];
    accessibilityState: FlatListProps<OptionType<T>>['accessibilityState'];
    initialScrollIndex: number;
} & OptionalToRequired<Pick<SelectProps<T>, 'flatListProps' | 'disabled'>>;
