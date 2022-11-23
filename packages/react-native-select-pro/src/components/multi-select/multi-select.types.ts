import type { OptionType } from '../../index';
import type { SelectControlStyles } from '../../types/styles';

export type MultiSelectProps = {
    selectStyles: SelectControlStyles | undefined;
    onPressRemove: (option: OptionType | null) => void;
    selectedOptions: OptionType[] | null;
};
