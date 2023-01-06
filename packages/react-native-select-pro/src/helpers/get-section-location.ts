import type { State } from '../state';
import type { SectionOptionType } from '../types';

type Props<T> = {
    data: SectionOptionType<T>[];
    scrollToSelectedOption?: boolean;
} & Pick<State<T>, 'selectedOption'>;

export const getSectionLocation = <T>({
    data,
    selectedOption,
    scrollToSelectedOption,
}: Props<T>) => {
    let indexes = {
        sectionIndex: 0,
        itemIndex: 0,
    };

    if (scrollToSelectedOption && selectedOption && 'section' in selectedOption) {
        const { value, section } = selectedOption;
        const sectionItem = data.find((item) => item.title === section?.title);
        if (sectionItem) {
            indexes = {
                sectionIndex: data.findIndex((item) => item.title === sectionItem.title),
                itemIndex: sectionItem?.data.findIndex((item) => item.value === value),
            };
        }
    }

    return indexes;
};
