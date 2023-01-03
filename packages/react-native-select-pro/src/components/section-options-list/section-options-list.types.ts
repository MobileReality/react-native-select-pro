import type { SectionListProps } from 'react-native';

import type { OptionType, SectionOptionType } from '../../types';

export type SectionOptionsListProps = {
    resolvedData: SectionOptionType[];
    renderItem: SectionListProps<OptionType>['renderItem'];
    getItemLayout: SectionListProps<OptionType>['getItemLayout'];
};
