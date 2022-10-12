import type { OptionsType, SectionOptionType } from '../types';

export const isSectionOptionsType = (
    val: OptionsType,
): val is SectionOptionType[] =>
    val.length > 0 && 'title' in val[0] && 'data' in val[0];
