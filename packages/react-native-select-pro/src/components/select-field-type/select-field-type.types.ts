import type { OptionType } from '../../index';
import type { SelectControlStyles } from '../../types/styles';

export type SelectFieldTypeProps = {
    onPressRemove: (option?: OptionType | null) => void;
    selectStyles: SelectControlStyles | undefined;
};
