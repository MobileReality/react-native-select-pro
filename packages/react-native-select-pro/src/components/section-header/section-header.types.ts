import type { OptionalToRequired } from '../../helpers';
import type { SelectStyles } from '../../types/styles';

export type SectionHeaderProps = { title: string } & OptionalToRequired<
    Pick<SelectStyles, 'optionsList'>
>;
