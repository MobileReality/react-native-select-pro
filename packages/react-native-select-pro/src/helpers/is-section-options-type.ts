import type { OptionsType, SectionOptionType } from '../types';

export const isSectionOptionsType = <T>(val: OptionsType<T>): val is SectionOptionType<T>[] =>
    val.length > 0 && 'title' in val[0] && 'data' in val[0];
