import type { SectionListProps } from 'react-native';
import type { FlatListProps } from 'react-native';

import type { State } from '../../state';
import type { OptionalToRequired, OptionType, SectionOptionType, SelectProps } from '../../types';

export type SectionOptionsListProps = {
    resolvedData: SectionOptionType[];
    renderItem: SectionListProps<OptionType>['renderItem'];
    getItemLayout: SectionListProps<OptionType>['getItemLayout'];
    accessibilityState: FlatListProps<OptionType>['accessibilityState'];
} & OptionalToRequired<
    Pick<State, 'selectedOption'> &
        Pick<SelectProps, 'scrollToSelectedOption' | 'sectionListProps' | 'disabled'>
>;
