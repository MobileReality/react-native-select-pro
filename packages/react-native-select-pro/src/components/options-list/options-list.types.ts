import type { ComponentProps } from 'react';
import type { SectionListData } from 'react-native';

import type { OptionalToRequired } from '../../helpers';
import type { Position, State } from '../../state/types';
import type { OnOutsidePress, OnPressOptionType, OptionType } from '../../types';
import type { OptionsListStyles, SelectStyles } from '../../types/styles';
import type { Select } from '../select';

type FromSelectComponentProps = Pick<
    ComponentProps<typeof Select>,
    | 'flatListProps'
    | 'scrollToSelectedOption'
    | 'noOptionsText'
    | 'onSelect'
    | 'animation'
    | 'NoOptionsComponent'
    | 'OptionComponent'
    | 'sectionListProps'
> &
    Pick<SelectStyles, 'optionsListStyles'>;

export type OptionsListProps = OptionalToRequired<
    FromSelectComponentProps &
        Pick<
            State,
            | 'isOpened'
            | 'openedPosition'
            | 'optionsData'
            | 'selectedOption'
            | 'searchedOptions'
            | 'searchValue'
            | 'selectedOptionIndex'
        >
> & {
    onOutsidePress: OnOutsidePress;
    onPressOption: OnPressOptionType;
} & Pick<Position, 'aboveSelectControl'>;

export type UseOptionsListProps = Pick<
    State,
    'isOpened' | 'optionsData' | 'selectedOption' | 'searchedOptions' | 'searchValue'
> &
    OptionalToRequired<Pick<OptionsListStyles, 'optionStyle'>>;

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
