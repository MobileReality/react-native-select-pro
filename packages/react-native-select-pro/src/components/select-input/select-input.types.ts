import type { StyleProp, TextStyle } from 'react-native';

import type { OptionalToRequired } from '../../helpers';
import type { State } from '../../state/types';

export type SelectInputProps = OptionalToRequired<Pick<State, 'selectedOption'>> & {
    textStyle: StyleProp<TextStyle>;
};
