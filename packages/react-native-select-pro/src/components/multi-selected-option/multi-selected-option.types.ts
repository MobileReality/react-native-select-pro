import type {
    OnPressRemove,
    OptionalToRequired,
    OptionType,
    SelectProps,
    SelectStyles,
} from '../../types';

export type MultiSelectedOptionProps = {
    option: OptionType | null;
    optionWidth: number | string;
    onPressRemove: OnPressRemove;
    multiSelectedCustomStyles: NonNullable<SelectStyles['select']>['multiSelectedOption'];
} & OptionalToRequired<Pick<SelectProps, 'disabled'>>;
