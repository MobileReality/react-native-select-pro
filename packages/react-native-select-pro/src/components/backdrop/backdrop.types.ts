import type { OptionalToRequired } from '../../helpers';
import type { OnOutsidePress } from '../../types';
import type { SelectStyles } from '../../types/styles';

export type BackdropProps = {
    onOutsidePress: OnOutsidePress;
} & OptionalToRequired<Pick<SelectStyles, 'backdrop'>>;
