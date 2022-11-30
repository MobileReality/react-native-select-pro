import type { OptionType, SectionOptionType } from '../types';

export const isSectionSelected = ({
    title,
    selectedOptions,
    sectionData,
}: {
    title: string;
    selectedOptions: OptionType[];
    sectionData: SectionOptionType[];
}) =>
    Array.isArray(selectedOptions) &&
    sectionData
        .find((item) => item.title === title)
        ?.data.filter(
            (item) =>
                !selectedOptions.some((selected: OptionType) => selected.value === item.value),
        ).length === 0;
