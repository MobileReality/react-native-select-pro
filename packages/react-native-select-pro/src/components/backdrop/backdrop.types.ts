import type { OptionalToRequired } from '../../helpers';
import type { SelectProps } from '../../types';
import type { OnOutsidePress } from '../../types/shared';
import type { SelectStyles } from '../../types/styles';

export type BackdropProps = {
    onOutsidePress: OnOutsidePress;
} & OptionalToRequired<Pick<SelectStyles, 'backdrop'>> &
    Pick<SelectProps, 'backdropProps' | 'backdropChildProps'>;
