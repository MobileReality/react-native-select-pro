import type { OptionalToRequired, OptionType, SelectProps } from '../../types';

export type OptionProps = {
    isSelected: boolean;
    option: OptionType;
    optionIndex: number;
} & OptionalToRequired<Pick<SelectProps, 'disabled'>>;
