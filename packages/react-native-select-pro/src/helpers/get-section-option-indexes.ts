import type { OptionType, SectionOptionType } from '../types';

import { getReducedSectionData } from './get-reduced-section-data';

export const getSectionOptionIndexes = <T>(
    data: SectionOptionType<T>[],
    options: OptionType<T>[],
) =>
    options
        .map((item) => getReducedSectionData(data).findIndex(({ value }) => value === item.value))
        .filter((item): item is number => item !== null);
