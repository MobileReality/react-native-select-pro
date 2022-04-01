import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';
import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';

export const Searchable = () => {
    return (
        <SafeAreaViewWrapper>
            <Text>Search sth...</Text>
            <Select
                options={DATA}
                searchable={true}
                selectControlStyle={{ width: 250 }}
            />
        </SafeAreaViewWrapper>
    );
};
