import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

export const Searchable = () => {
    return (
        <SafeAreaView>
            <Text>Search sth...</Text>
            <Select options={DATA} searchable={true} selectControlStyle={{ width: 250 }} />
        </SafeAreaView>
    );
};
