import type { OptionalToRequired } from '../../helpers';
import type { OptionType } from '../../index';
import type { SelectControlStyles } from '../../types/styles';

type FromSelectComponentProps = Pick<
    SelectControlStyles,
    'multiSelectionOptionStyle' | 'textStyle' | 'containerStyle'
>;

type SelectControlProps = OptionalToRequired<FromSelectComponentProps>;

export type MultiSelectProps = SelectControlProps & {
    onPressRemove: (option: OptionType | null) => void;
    selectedOptions: OptionType[] | null;
};
