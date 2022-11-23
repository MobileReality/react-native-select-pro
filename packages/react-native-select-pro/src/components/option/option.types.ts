import type { OptionType } from '../../index';

export type OptionProps = {
    isSelected: boolean;
    option: OptionType;
    optionIndex: number;
};

export type OnChooseOption = () => void;
