import type { ComponentPropsWithRef } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { Select } from '../../index';
import type { DispatchType, Position, State } from '../../state/types';
import type { OnPressSelectControlType, OnSetPosition } from '../../types';
import type { SelectStyles } from '../../types/styles';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'clearable'
    | 'animation'
    | 'disabled'
    | 'searchable'
    | 'searchPattern'
    | 'textInputProps'
    | 'placeholderText'
    | 'placeholderTextColor'
    | 'hideSelectControlArrow'
    | 'multiSelection'
    | 'onSelect'
    | 'onRemove'
    | 'selectControlClearOptionA11yLabel'
    | 'selectControlOpenDropdownA11yLabel'
> &
    Pick<State, 'optionsData'>;

export type SelectControlProps = OptionalToRequired<
    {
        onPressSelectControl: OnPressSelectControlType;
    } & FromSelectComponentProps &
        Pick<State, 'isOpened' | 'selectedOption' | 'searchValue' | 'selectedOptionIndex'> & {
            dispatch: DispatchType;
        } & Pick<Position, 'aboveSelectControl'> & {
            setPosition: OnSetPosition;
        } & Pick<
            SelectStyles,
            'arrowIconStyles' | 'clearOptionStyles' | 'customLeftIconStyles' | 'selectControlStyles'
        >
>;
