import type { OptionTypeRequired, SectionOptionType } from '../types';

export const getReducedSectionData = (data: SectionOptionType[]) =>
    data.reduce<OptionTypeRequired[]>(
        (prev, current) => [...prev, ...current.data],
        [],
    );
