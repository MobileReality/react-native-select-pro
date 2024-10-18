import type { OptionType } from '../../types';
import { getDefaultSelectionIndex } from '../index';

describe('getDefaultSelectionIndex', () => {
    const options: OptionType[] = [
        { label: 'Option 1', value: 'value1' },
        { label: 'Option 2', value: 'value2' },
        { label: 'Option 3', value: 'value3' },
    ];

    it('should return the correct index for a single default option', () => {
        const defaultOption = { label: 'Option 2', value: 'value2' };
        expect(getDefaultSelectionIndex(options, defaultOption)).toBe(1);
    });

    it('should return -1 if the single default option is not found', () => {
        const defaultOption = { label: 'Option 4', value: 'value4' };
        expect(getDefaultSelectionIndex(options, defaultOption)).toBe(-1);
    });

    it('should return an array of indices for multiple default options', () => {
        const defaultOptions = [
            { label: 'Option 1', value: 'value1' },
            { label: 'Option 3', value: 'value3' },
        ];
        expect(getDefaultSelectionIndex(options, defaultOptions)).toEqual([0, 2]);
    });

    it('should return only found indices for multiple default options', () => {
        const defaultOptions = [
            { label: 'Option 1', value: 'value1' },
            { label: 'Option 4', value: 'value4' },
        ];
        expect(getDefaultSelectionIndex(options, defaultOptions)).toEqual([0]);
    });

    it('should return an empty array if no default options are found', () => {
        const defaultOptions = [
            { label: 'Option 4', value: 'value4' },
            { label: 'Option 5', value: 'value5' },
        ];
        expect(getDefaultSelectionIndex(options, defaultOptions)).toEqual([]);
    });
});
