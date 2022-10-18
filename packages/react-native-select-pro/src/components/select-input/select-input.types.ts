import type { OptionalToRequired } from '../../helpers';
import type { DispatchType, State } from '../../state/types';
import type { OnPressSelectControlType, OnSetPosition, SelectProps } from '../../types';
import type { SelectControlStyles } from '../../types/styles';

export type SelectInputProps = OptionalToRequired<
    Pick<State, 'isOpened' | 'searchValue' | 'selectedOption'> & {
        dispatch: DispatchType;
    } & Pick<
            SelectProps,
            | 'placeholderText'
            | 'searchPattern'
            | 'disabled'
            | 'multiSelection'
            | 'placeholderTextColor'
            | 'textInputProps'
        > & { onPressSelectControl: OnPressSelectControlType } & {
            setPosition: OnSetPosition;
        } & Pick<SelectControlStyles, 'textStyle'>
>;
