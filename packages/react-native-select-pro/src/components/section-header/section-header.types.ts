import type { OptionalToRequired } from '../../helpers';
import type { SelectStyles } from '../../types/styles';

export type SectionHeaderProps = {
    title: string;
    onPressSection: (title: string) => void;
    isSelected: boolean;
} & OptionalToRequired<Pick<SelectStyles, 'sectionHeader'>>;
