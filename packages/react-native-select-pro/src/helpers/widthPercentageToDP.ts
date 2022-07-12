/**
 * based on marudy/react-native-responsive-screen
 * @author Tasos Maroudas
 */

import { PixelRatio } from 'react-native';

export const widthPercentageToDP = (
    widthPercent: string,
    screenWidth: number,
) => {
    const elemWidth =
        typeof widthPercent === 'number'
            ? widthPercent
            : Number.parseFloat(widthPercent);

    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};
