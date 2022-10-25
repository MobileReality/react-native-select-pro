import { PixelRatio } from 'react-native';

export const dimensionPercentageToDP = (dimensionPercentage: string, screenDimension: number) => {
    if (dimensionPercentage.length >= 2 && dimensionPercentage.endsWith('%')) {
        const numPercentage = Number(dimensionPercentage.slice(0, -1));
        if (numPercentage) {
            return PixelRatio.roundToNearestPixel((screenDimension * numPercentage) / 100);
        }
    }

    return 0;
};
