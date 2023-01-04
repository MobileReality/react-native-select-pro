import type { TouchableWithoutFeedbackProps, ViewProps } from 'react-native';

import type { OptionalToRequired } from '../../helpers';
import type { OnOutsidePress } from '../../types';
import type { SelectStyles } from '../../types/styles';

export type BackdropProps = {
    onOutsidePress: OnOutsidePress;
    backdropProps?: Omit<TouchableWithoutFeedbackProps, 'style' | 'onPress'>;
    backdropChildProps?: Omit<ViewProps, 'style'>;
} & OptionalToRequired<Pick<SelectStyles, 'backdrop'>>;
