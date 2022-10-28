import type { State } from '../state/types';
import type { SectionOptionType } from '../types';

type Props = {
    data: SectionOptionType[];
    scrollToSelectedOption?: boolean;
} & Pick<State, 'selectedOption'>;

export const getSectionLocation = ({ data, selectedOption, scrollToSelectedOption }: Props) => {
    let sectionIndex = 0;
    let itemIndex = 0;

    if (scrollToSelectedOption && selectedOption && 'section' in selectedOption) {
        const { value, section } = selectedOption;
        const sectionItem = data.find((item) => item.title === section?.title);
        if (sectionItem) {
            sectionIndex = section?.index ?? 0;
            itemIndex = sectionItem?.data.findIndex((item) => item.value === value);
        }
    }

    return { sectionIndex, itemIndex };
};
