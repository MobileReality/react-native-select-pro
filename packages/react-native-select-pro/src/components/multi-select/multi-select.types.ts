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
    | 'multiSelection'
    | 'placeholderTextColor'
> &
    Pick<SelectControlStyles, 'multiSelectionOptionStyle' | 'textStyle' | 'containerStyle'>;

type SelectControlProps = OptionalToRequired<FromSelectComponentProps>;

export type MultiSelectProps = SelectControlProps &
    Pick<State, 'isOpened' | 'searchValue'> & {
        onPressRemove: (option: OptionType | null) => void;
        onPressSelectControl: OnPressSelectControlType;
        dispatch: DispatchType;
        setPosition: OnSetPosition;
        selectedOptions: OptionType[] | null;
    };
