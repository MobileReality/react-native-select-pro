import type { OptionType } from '../types';

export const isValidDefaultOption = <T>(
    defaultOption?: OptionType<T>,
): defaultOption is OptionType<T> => {
    if (!defaultOption) {
        return false;
    }
    return (
        Object.prototype.hasOwnProperty.call(defaultOption, 'value') &&
        Object.prototype.hasOwnProperty.call(defaultOption, 'label')
    );
};
