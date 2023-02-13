import type { FlatListProps, SectionListProps } from 'react-native';

import type { State } from '../../state';
import type { OptionalToRequired, OptionType, SectionOptionType, SelectProps } from '../../types';

export type SectionOptionsListProps<T> = {
    resolvedData: SectionOptionType<T>[];
    renderItem: SectionListProps<OptionType<T>>['renderItem'];
    getItemLayout: SectionListProps<OptionType<T>>['getItemLayout'];
    accessibilityState: FlatListProps<OptionType<T>>['accessibilityState'];
} & OptionalToRequired<
    Pick<State<T>, 'selectedOption'> &
        Pick<SelectProps<T>, 'scrollToSelectedOption' | 'sectionListProps' | 'disabled'>
>;
