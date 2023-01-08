import type { OptionalToRequired, OptionStyles, OptionType, SelectProps } from '../../types';
import type { OnPressOptionType } from '../../types';

export type OptionProps<T> = {
    isSelected: boolean;
    isDisabled: boolean;
    overrideWithDisabledStyle: boolean;
    option: OptionType<T>;
    optionIndex: number;
    onPressOption: OnPressOptionType<T>;
    optionCustomStyles: OptionStyles | undefined;
} & OptionalToRequired<Pick<SelectProps<T>, 'optionButtonProps' | 'optionTextProps'>>;
