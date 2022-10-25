import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { dimensionPercentageToDP } from '../../helpers';
import type { OptionType } from '../../types';

const WIDTH_THRESHOLD = 100;
const WIDTH_OFFSET = 72;

type UseMultiSelectProps = {
    selectedOptions: OptionType[] | null;
    containerWidth: string | number | undefined;
};

export const useMultiSelect = ({ selectedOptions, containerWidth }: UseMultiSelectProps) => {
    const { width: screenWidth } = useWindowDimensions();

    const calculatedOptionWidth = useMemo(() => {
        if (!selectedOptions) {
            return 0;
        }

        const { length } = selectedOptions;
        const initialWidth = containerWidth ?? 100;
        let calculatedWidth = 100;
        if (typeof initialWidth === 'number') {
            calculatedWidth = (initialWidth - WIDTH_OFFSET) / length;
            if (calculatedWidth < WIDTH_THRESHOLD) {
                return WIDTH_THRESHOLD;
            }
            return Math.floor(calculatedWidth);
        }
        if (typeof initialWidth === 'string') {
            const ratioToScreen = dimensionPercentageToDP(initialWidth, screenWidth);
            calculatedWidth = ratioToScreen / length;
            if (calculatedWidth - WIDTH_OFFSET < WIDTH_THRESHOLD) {
                return WIDTH_THRESHOLD;
            }
            return calculatedWidth - WIDTH_OFFSET;
        }
        return 0;
    }, [selectedOptions, containerWidth, screenWidth]);

    return {
        calculatedOptionWidth,
    };
};
