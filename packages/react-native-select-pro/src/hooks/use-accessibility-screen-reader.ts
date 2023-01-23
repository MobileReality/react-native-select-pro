import { useEffect, useState } from 'react';
import type { EmitterSubscription } from 'react-native';
import { AccessibilityInfo } from 'react-native';

import { ERRORS, isAndroid, logError } from '../helpers';

export const useAccessibilityScreenReader = () => {
    const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);

    useEffect(() => {
        if (isAndroid) {
            return;
        }

        let subscription: EmitterSubscription | null = null;
        void (async () => {
            try {
                await AccessibilityInfo.isScreenReaderEnabled();
            } catch {
                logError(ERRORS.SCREEN_READER_ERROR);
            }
            subscription = AccessibilityInfo.addEventListener('change', (e) => {
                setIsScreenReaderEnabled(e);
            });
        })();

        return () => {
            subscription?.remove();
        };
    }, []);

    return isScreenReaderEnabled;
};
