import type { OptionType, SectionOptionType } from '../types';

export const getReducedSectionData = <T>(data: SectionOptionType<T>[]) =>
    data.reduce<OptionType<T>[]>((prev, current) => [...prev, ...current.data], []);
