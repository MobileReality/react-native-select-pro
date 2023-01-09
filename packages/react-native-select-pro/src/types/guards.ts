import type { OptionsType, OptionType, SectionOptionType } from './types';

export type OptionalToRequired<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : T[P] | undefined;
};

export const isFlatOptionsType = <T>(val: OptionsType<T>): val is OptionType<T>[] =>
    val.length > 0 && 'label' in val[0] && 'value' in val[0];

export const isSectionOptionsType = <T>(val: OptionsType<T>): val is SectionOptionType<T>[] =>
    val.length > 0 && 'title' in val[0] && 'data' in val[0];
