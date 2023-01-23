import { dimensionPercentageToDP } from '../index';

const SCREEN_WIDTH = 400;

describe('dimensionPercentageToDP', () => {
    it('should, return dp based on provided dimension as percentage', () => {
        expect(dimensionPercentageToDP('', SCREEN_WIDTH)).toBe(0);
        expect(dimensionPercentageToDP('%', SCREEN_WIDTH)).toBe(0);
        expect(dimensionPercentageToDP('@%', SCREEN_WIDTH)).toBe(0);
        expect(dimensionPercentageToDP('%%', SCREEN_WIDTH)).toBe(0);
        expect(dimensionPercentageToDP('100', SCREEN_WIDTH)).toBe(0);
        expect(dimensionPercentageToDP('10%0', SCREEN_WIDTH)).toBe(0);
        expect(dimensionPercentageToDP('100@', SCREEN_WIDTH)).toBe(0);
        expect(dimensionPercentageToDP('0%', SCREEN_WIDTH)).toBe(0);
        expect(dimensionPercentageToDP('1%', SCREEN_WIDTH)).toBe(4);
        expect(dimensionPercentageToDP('10%', SCREEN_WIDTH)).toBe(40);
        expect(dimensionPercentageToDP('100%', SCREEN_WIDTH)).toBe(400);
    });
});
