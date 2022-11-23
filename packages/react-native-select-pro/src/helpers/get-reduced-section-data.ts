import type { OptionTypeRequired, SectionOptionType } from '../types';

export const getReducedSectionData = <T>(data: SectionOptionType<T>[]) =>
    data.reduce<OptionTypeRequired[]>((prev, current) => [...prev, ...current.data], []);
