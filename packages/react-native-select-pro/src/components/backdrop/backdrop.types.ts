import type { OnOutsidePress, OptionalToRequired, SelectProps, SelectStyles } from '../../types';

export type BackdropProps = {
    onOutsidePress: OnOutsidePress;
    backdropCustomStyles: OptionalToRequired<SelectStyles>['backdrop'];
} & OptionalToRequired<Pick<SelectProps, 'backdropProps' | 'backdropChildProps'>>;
