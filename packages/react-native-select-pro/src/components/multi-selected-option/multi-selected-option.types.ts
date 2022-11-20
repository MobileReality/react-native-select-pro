import type { SelectControlStyles } from 'packages/react-native-select-pro/src/types/styles';

import type { OptionalToRequired } from '../../helpers';
import type { OptionType } from '../../index';

type FromSelectComponentProps = Pick<
    SelectControlStyles,
    'textStyle' | 'multiSelectionOptionStyle'
>;

export type MultiSelectedOptionProps = {
    option: OptionType | null;
    optionWidth: number | string;
    isPlaceholder?: boolean;
    onPressRemove?: (option: OptionType) => void;
} & OptionalToRequired<FromSelectComponentProps>;
