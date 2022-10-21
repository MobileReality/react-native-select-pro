import { dimensionPercentageToDP } from './dimension-percentage-to-dp';

type Size = {
    size: string | number | undefined;
    screenSize: number;
    sizeFallback: number;
};

export const getSize = ({ size, screenSize, sizeFallback }: Size) => {
    if (typeof size === 'string') {
        return dimensionPercentageToDP(size, screenSize);
    }
    return size ?? sizeFallback;
};
