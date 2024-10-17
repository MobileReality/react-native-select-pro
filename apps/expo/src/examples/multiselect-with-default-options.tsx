import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const MultiSelectWithDefaultOptions = () => {
    return (
        <SafeAreaViewWrapper>
            <Select options={DATA} multiple={true} defaultOption={[DATA[0], DATA[1]]} />
        </SafeAreaViewWrapper>
    );
};
