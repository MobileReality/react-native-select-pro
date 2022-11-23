import type { OptionalToRequired } from '../../helpers';
import type { State } from '../../state/types';
import type { SelectControlStyles } from '../../types/styles';

export type SelectInputProps<T> = OptionalToRequired<
    Pick<State<T>, 'selectedOption'> & Pick<SelectControlStyles, 'textStyle'>
>;
