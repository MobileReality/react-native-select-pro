import type { OptionalToRequired, OptionStyles, OptionType, SelectProps } from '../../types';
import type { OnPressOptionType } from '../../types';

export type OptionProps = {
    isSelected: boolean;
    isDisabled: boolean;
    option: OptionType;
    optionIndex: number;
    onPressOption: OnPressOptionType<unknown>;
    optionCustomStyles: OptionStyles | undefined;
} & OptionalToRequired<Pick<SelectProps, 'disabled' | 'optionButtonProps' | 'optionTextProps'>>;
