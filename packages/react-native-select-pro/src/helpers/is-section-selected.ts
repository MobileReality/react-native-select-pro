import type { OptionType, SectionOptionType } from '../types';

type IsSectionSelected = {
    title: string;
    selectedOptions: OptionType[];
    sectionData: SectionOptionType[];
};

export const isSectionSelected = ({ title, selectedOptions, sectionData }: IsSectionSelected) =>
    Array.isArray(selectedOptions) &&
    sectionData
        .find((item) => item.title === title)
        ?.data.filter(
            (item) =>
                !selectedOptions.some((selected: OptionType) => selected.value === item.value),
        ).length === 0;
