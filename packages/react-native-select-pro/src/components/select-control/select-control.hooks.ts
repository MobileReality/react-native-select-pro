import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

import { isAndroid } from '../../helpers';

export const useAccessibilityScreenReader = () => {
    const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);

    useEffect(() => {
        if (!isAndroid) {
            AccessibilityInfo.isScreenReaderEnabled()
                .then((e) => {
                    setIsScreenReaderEnabled(e);
                }) // eslint-disable-next-line no-console
                .catch(() => console.error('isScreenReaderEnabled error'));
            AccessibilityInfo.addEventListener('change', (e) => {
                setIsScreenReaderEnabled(e);
            });
        }
    }, []);

    return isScreenReaderEnabled;
};
