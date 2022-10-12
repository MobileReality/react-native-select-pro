/**
 * based on marudy/react-native-responsive-screen
 * @author Tasos Maroudas
 */

import { PixelRatio } from 'react-native';

export const heightPercentageToDP = (
    heightPercent: string,
    screenHeight: number,
) => {
    const elemHeight =
        typeof heightPercent === 'number'
            ? heightPercent
            : Number.parseFloat(heightPercent);

    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};
