import type { FlatListProps } from 'react-native';

import type { OptionalToRequired, OptionType, SelectProps } from '../../types';

export type FlatOptionsListProps = {
    resolvedData: OptionType[];
    renderItem: FlatListProps<OptionType>['renderItem'];
    getItemLayout: FlatListProps<OptionType>['getItemLayout'];
    accessibilityState: FlatListProps<OptionType>['accessibilityState'];
    initialScrollIndex: number;
} & OptionalToRequired<Pick<SelectProps, 'flatListProps'>>;
