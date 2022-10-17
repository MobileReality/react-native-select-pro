import type { ComponentPropsWithRef } from 'react';
import type { SelectControlStyles } from 'packages/react-native-select-pro/src/types/styles';

import type { OptionalToRequired } from '../../helpers';
import type { OptionType, Select } from '../../index';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    'placeholderText' | 'placeholderTextColor'
> &
    Pick<SelectControlStyles, 'textStyle' | 'multiSelectionOptionStyle'>;

export type MultiSelectedOptionProps = {
    option: OptionType | null;
    optionWidth: number | string;
    isPlaceholder?: boolean;
    onPressRemove?: (option: OptionType) => void;
} & OptionalToRequired<FromSelectComponentProps>;
