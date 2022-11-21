import type { OptionalToRequired } from '../../helpers';
import type { OptionType } from '../../index';
import type { OptionsListStyles } from '../../types/styles';

type FromOptionsListComponentProps = Pick<
    OptionsListStyles,
    'optionSelectedStyle' | 'optionStyle' | 'optionTextStyle'
>;

export type OptionProps = OptionalToRequired<FromOptionsListComponentProps> & {
    isSelected: boolean;
    option: OptionType;
    optionIndex: number;
};

export type OnChooseOption = () => void;
