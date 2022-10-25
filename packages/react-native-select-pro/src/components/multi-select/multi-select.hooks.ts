import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useWindowDimensions } from 'react-native';

import { parsePercentageToNumber } from '../../helpers';
import type { OptionType } from '../../types';

const WIDTH_THRESHOLD = 100;
const WIDTH_OFFSET = 72;

type UseMultiSelectProps = {
    selectedOptions: OptionType[] | null;
    containerStyle: StyleProp<ViewStyle>;
};

export const useMultiSelect = ({ selectedOptions, containerStyle }: UseMultiSelectProps) => {
    const { width } = useWindowDimensions();

    const calculatedOptionWidth = useMemo(() => {
        if (!selectedOptions) {
            return 0;
        }

        const { length } = selectedOptions;
        const initialWidth = containerStyle ? (containerStyle as ViewStyle).width : 100;
        let calculatedWidth = 100;
        if (typeof initialWidth === 'number') {
            calculatedWidth = (initialWidth - WIDTH_OFFSET) / length;
            if (calculatedWidth < WIDTH_THRESHOLD) {
                return WIDTH_THRESHOLD;
            }
            return Math.floor(calculatedWidth);
        }
        if (typeof initialWidth === 'string') {
            const ratioToScreen = Math.floor(width * (parsePercentageToNumber(initialWidth) / 100));
            calculatedWidth = ratioToScreen / length;
            if (calculatedWidth - WIDTH_OFFSET < WIDTH_THRESHOLD) {
                return WIDTH_THRESHOLD;
            }
            return calculatedWidth - WIDTH_OFFSET;
        }
        return 0;
    }, [selectedOptions, containerStyle, width]);

    return {
        calculatedOptionWidth,
    };
};
