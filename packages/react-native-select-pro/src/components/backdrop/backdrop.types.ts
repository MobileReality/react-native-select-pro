import type { OnOutsidePress, OptionalToRequired, SelectProps, SelectStyles } from '../../types';

export type BackdropProps<T> = {
    onOutsidePress: OnOutsidePress;
    backdropCustomStyles: OptionalToRequired<SelectStyles>['backdrop'];
} & OptionalToRequired<Pick<SelectProps<T>, 'backdropProps' | 'backdropChildProps'>>;
