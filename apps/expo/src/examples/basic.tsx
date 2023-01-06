import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const Basic = () => {
    useEffect(() => {
        I18nManager.forceRTL(false);
    }, []);
    return (
        <SafeAreaViewWrapper>
            <Select options={DATA} />
        </SafeAreaViewWrapper>
    );
};
