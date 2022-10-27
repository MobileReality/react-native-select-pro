import type { ComponentProps, ReactElement } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { State } from '../../state/types';
import type { SectionOptionType } from '../../types';
import type { OptionsListStyles } from '../../types/styles';
import type { ItemLayout, RenderItemProps } from '../options-list/options-list.types';
import type { Select } from '../select';

type FromSelectComponentProps = Pick<
    ComponentProps<typeof Select>,
    'noOptionsText' | 'NoOptionsComponent' | 'sectionListProps'
>;

export type SectionOptionsListProps = {
    renderItem: <T>({ item, index, section }: RenderItemProps<T>) => ReactElement;
    getItemLayout: <T>(_data: T, index: number) => ItemLayout;
    optionsData: SectionOptionType[];
} & Pick<State, 'isOpened'> &
    OptionalToRequired<
        FromSelectComponentProps &
            Pick<OptionsListStyles, 'sectionHeaderTextStyle' | 'sectionHeaderContainerStyle'>
    >;
