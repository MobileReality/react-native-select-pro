import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants';

export const Searchable = () => {
    return (
        <SafeAreaViewWrapper>
            <Text>Search sth...</Text>
            <Select options={DATA} searchable={true} containerStyle={{ width: 250 }} />
        </SafeAreaViewWrapper>
    );
};
