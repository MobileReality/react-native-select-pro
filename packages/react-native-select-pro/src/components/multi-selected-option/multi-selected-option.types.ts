import type { SelectControlStyles } from 'packages/react-native-select-pro/src/types/styles';

import type { OptionType } from '../../index';

export type MultiSelectedOptionProps = {
    option: OptionType | null;
    optionWidth: number | string;
    isPlaceholder?: boolean;
    onPressRemove?: (option: OptionType) => void;
    selectStyles: SelectControlStyles | undefined;
};
