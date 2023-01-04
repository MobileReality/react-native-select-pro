import type { OnOutsidePress, OptionalToRequired, SelectProps, SelectStyles } from '../../types';

export type BackdropProps = {
    onOutsidePress: OnOutsidePress;
} & OptionalToRequired<Pick<SelectStyles, 'backdrop'>> &
    Pick<SelectProps, 'backdropProps' | 'backdropChildProps'>;
