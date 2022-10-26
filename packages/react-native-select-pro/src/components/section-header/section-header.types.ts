import type { OptionalToRequired } from '../../helpers';
import type { OptionsListStyles } from '../../types/styles';

export type SectionHeaderProps = { title: string } & OptionalToRequired<
    Pick<OptionsListStyles, 'sectionHeaderContainerStyle' | 'sectionHeaderTextStyle'>
>;
