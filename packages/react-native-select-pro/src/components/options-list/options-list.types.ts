import type { SectionListData } from 'react-native';

import type { OptionalToRequired } from '../../helpers';
import type { OptionType } from '../../types';
import type { OptionStyles } from '../../types/styles';

export type UseOptionsListProps = OptionalToRequired<{
    optionStyles: OptionStyles | undefined;
}>;

export type RenderItemProps<T> = {
    item: OptionType;
    index: number;
    section?: SectionListData<T>;
};

export type ItemLayout = {
    length: number;
    offset: number;
    index: number;
};
