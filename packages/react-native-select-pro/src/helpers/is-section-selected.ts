import type { OptionType, SectionOptionType } from '../types';

type IsSectionSelected<T> = {
    title: string;
    selectedOptions: OptionType<T>[];
    sectionData: SectionOptionType<T>[];
};

export const isSectionSelected = <T>({
    title,
    selectedOptions,
    sectionData,
}: IsSectionSelected<T>) =>
    Array.isArray(selectedOptions) &&
    sectionData
        .find((item) => item.title === title)
        ?.data.filter(
            (item) =>
                !selectedOptions.some((selected: OptionType<T>) => selected.value === item.value),
        ).length === 0;
