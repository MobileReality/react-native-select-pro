import type { StyleProp, TextStyle } from 'react-native';

import type { OptionalToRequired } from '../../helpers';
import type { State } from '../../state';

export type SelectInputProps<T> = OptionalToRequired<
    Pick<State<T>, 'selectedOption'> & {
        textStyle: StyleProp<TextStyle>;
    }
>;
