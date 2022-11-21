import type { OptionalToRequired } from '../../helpers';
import type { OptionType } from '../../index';
import type { SelectControlStyles } from '../../types/styles';

export type SelectFieldTypeProps = OptionalToRequired<
    Pick<SelectControlStyles, 'containerStyle' | 'textStyle' | 'multiSelectionOptionStyle'> & {
        onPressRemove: (option?: OptionType | null) => void;
    }
>;
