import type { ComponentPropsWithRef } from 'react';

import type { OptionalToRequired } from '../../helpers';
import type { OptionType } from '../../index';
import type { OptionsListStyles } from '../../types/styles';
import type { OptionsList } from '../options-list';

type FromOptionsListComponentProps = Pick<
    ComponentPropsWithRef<typeof OptionsList>,
    'onSelect' | 'onPressOption' | 'OptionComponent'
> &
    Pick<OptionsListStyles, 'optionSelectedStyle' | 'optionStyle' | 'optionTextStyle'>;

export type OptionProps = OptionalToRequired<FromOptionsListComponentProps> & {
    isSelected: boolean;
    option: OptionType;
    optionIndex: number;
};

export type OnChooseOption = () => void;
