import type { FlatListProps } from 'react-native';

import type { OptionType } from '../../types';

export type FlatOptionsListProps = {
    resolvedData: OptionType[];
    renderItem: FlatListProps<OptionType>['renderItem'];
    getItemLayout: FlatListProps<OptionType>['getItemLayout'];
};
