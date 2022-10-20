import { parsePercentageToNumber } from './parse-percentage-to-number';

describe('parsePercentageToNumber', () => {
    it('should, check parsePercentageToNumber output validity', () => {
        expect(parsePercentageToNumber('')).toBe(0);
        expect(parsePercentageToNumber('100')).toBe(0);
        expect(parsePercentageToNumber('10%0')).toBe(0);
        expect(parsePercentageToNumber('%')).toBe(0);
        expect(parsePercentageToNumber('%%')).toBe(0);
        expect(parsePercentageToNumber('100@')).toBe(0);
        expect(parsePercentageToNumber('@%')).toBe(0);
        expect(parsePercentageToNumber('0%')).toBe(0);
        expect(parsePercentageToNumber('100%')).toBe(100);
    });
});
