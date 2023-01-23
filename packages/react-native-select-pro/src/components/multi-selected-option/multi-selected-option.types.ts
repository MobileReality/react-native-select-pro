import type {
    OnPressRemove,
    OptionalToRequired,
    OptionType,
    SelectProps,
    SelectStyles,
} from '../../types';

export type MultiSelectedOptionProps<T> = {
    option: OptionType<T> | null;
    optionWidth: number | string;
    onPressRemove: OnPressRemove<T> | null;
    multiSelectedCustomStyles: NonNullable<SelectStyles['select']>['multiSelectedOption'];
} & OptionalToRequired<Pick<SelectProps<T>, 'disabled'>>;
