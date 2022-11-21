import type { ReactElement } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { SectionOptionType } from '../../types';
import type { OptionsListStyles } from '../../types/styles';
import type { ItemLayout, RenderItemProps } from '../options-list/options-list.types';

export type SectionOptionsListProps = {
    renderItem: <T>({ item, index, section }: RenderItemProps<T>) => ReactElement;
    getItemLayout: <T>(_data: T, index: number) => ItemLayout;
    resolvedData: SectionOptionType[];
} & OptionalToRequired<
    Pick<OptionsListStyles, 'sectionHeaderTextStyle' | 'sectionHeaderContainerStyle'>
>;
