import type { ComponentProps, ReactElement } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { State } from '../../state/types';
import type { OnPressOptionType, OptionType, SectionOptionType } from '../../types';
import type { ItemLayout, RenderItemProps } from '../options-list/options-list.types';
import type { Select } from '../select';

type FromSelectComponentProps = Pick<
    ComponentProps<typeof Select>,
    'flatListProps' | 'scrollToSelectedOption' | 'noOptionsText' | 'NoOptionsComponent'
>;

export type FlatOptionsListProps = {
    renderItem: <T>({ item, index, section }: RenderItemProps<T>) => ReactElement;
    getItemLayout: <T>(_data: T, index: number) => ItemLayout;
    resolveData: () => OptionType[] | SectionOptionType[];
    onPressOption: OnPressOptionType;
} & OptionalToRequired<FromSelectComponentProps> &
    Pick<State, 'isOpened' | 'selectedOptionIndex'>;
