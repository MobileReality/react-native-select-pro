import type { OptionalToRequired } from '../../helpers';
import type { OptionsListStyles } from '../../types/styles';

export type SectionHeaderProps = {
    title: string;
    onPressSection: (title: string) => void;
    isSectionSelected: (title: string) => boolean;
} & OptionalToRequired<Pick<OptionsListStyles, 'sectionHeader'>>;
