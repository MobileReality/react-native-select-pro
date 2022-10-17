import type { ComponentPropsWithRef } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { OnPressSelectControlType, OnSetPosition, OptionType, Select } from '../../index';
import type { DispatchType, State } from '../../state/types';
import type { SelectControlStyles } from '../../types/styles';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'placeholderText'
    | 'disabled'
    | 'searchPattern'
    | 'textInputProps'
    | 'searchable'
    | 'multiSelection'
    | 'placeholderTextColor'
> &
    Pick<SelectControlStyles, 'multiSelectionOptionStyle' | 'textStyle' | 'containerStyle'>;

type SelectControlProps = OptionalToRequired<
    FromSelectComponentProps & Pick<State, 'selectedOption'>
>;

export type MultiSelectProps = {
    onPressRemove: (option: OptionType | null) => void;
    onPressSelectControl: OnPressSelectControlType;
} & SelectControlProps &
    Pick<State, 'isOpened' | 'selectedOption' | 'searchValue'> & {
        dispatch: DispatchType;
    } & { setPosition: OnSetPosition };
