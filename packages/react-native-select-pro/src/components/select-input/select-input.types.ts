import type { OptionalToRequired } from '../../helpers';
import type { State } from '../../state/types';
import type { SelectControlStyles } from '../../types/styles';

export type SelectInputProps = OptionalToRequired<
    Pick<State, 'selectedOption'> & Pick<SelectControlStyles, 'textStyle'>
>;
