import { heightPercentageToDP } from './height-percentage-to-dp';
import { widthPercentageToDP } from './width-percentage-to-dp';

type Size = {
    size: string | number | undefined;
    sizeType: 'width' | 'height';
    screenSize: number;
    sizeFallback: number;
};

export const getSize = ({ size, sizeType, screenSize, sizeFallback }: Size) => {
    if (typeof size === 'undefined') {
        return sizeFallback;
    }

    if (typeof size === 'number') {
        return size ?? sizeFallback;
    }

    if (typeof size === 'string') {
        if (sizeType === 'width') {
            return widthPercentageToDP(size, screenSize);
        }

        if (sizeType === 'height') {
            return heightPercentageToDP(size, screenSize);
        }
    }

    return sizeFallback;
};
