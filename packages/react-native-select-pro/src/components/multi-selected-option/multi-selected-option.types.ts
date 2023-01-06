import type { SelectControlStyles } from 'packages/react-native-select-pro/src/types/styles';

import type { OnPressRemove, OptionType, SelectProps } from '../../index';

export type MultiSelectedOptionProps = {
    option: OptionType | null;
    optionWidth: number | string;
    onPressRemove: OnPressRemove;
    selectStyles: SelectControlStyles | undefined;
} & Pick<SelectProps, 'disabled'>;
