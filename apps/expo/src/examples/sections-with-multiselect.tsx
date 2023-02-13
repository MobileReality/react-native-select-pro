import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { SECTIONS_DATA } from '../constants/data';

export const SectionsWithMultiSelect = () => {
    return (
        <SafeAreaViewWrapper>
            <Select options={SECTIONS_DATA} multiple={true} theme="dark" />
        </SafeAreaViewWrapper>
    );
};
