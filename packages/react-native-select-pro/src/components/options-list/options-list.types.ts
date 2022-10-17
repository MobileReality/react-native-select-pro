import type { ComponentProps } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { Position, State } from '../../state/types';
import type { OnOutsidePress, OnPressOptionType } from '../../types';
import type { SelectStyles } from '../../types/styles';
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
    | 'searchable'
    | 'multiSelection'
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
        > & {
            onOutsidePress: OnOutsidePress;
            onPressOption: OnPressOptionType;
        } & Pick<Position, 'aboveSelectControl'>
>;
