import type { StyleProp, TextStyle } from 'react-native';

import type { State } from '../../state';
import type { OptionalToRequired } from '../../types';

export type SelectInputProps<T> = OptionalToRequired<
    Pick<State<T>, 'selectedOption'> & {
        textStyle: StyleProp<TextStyle>;
    }
>;
