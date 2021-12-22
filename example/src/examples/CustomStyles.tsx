import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';
import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';

export const CustomStyles = () => {
    return (
        <SafeAreaViewWrapper style={{ margin: 20, marginTop: 500 }}>
            <Select
                optionSelectedStyle={{ backgroundColor: 'lightgreen' }}
                optionStyle={{ backgroundColor: 'lightcoral', borderBottomWidth: 1, height: 40 }}
                optionTextStyle={{ fontSize: 20 }}
                options={DATA}
                optionsListStyle={{ maxHeight: 150 }}
                selectControlStyle={{ width: 250, backgroundColor: 'lightblue', height: 80 }}
                selectControlTextStyle={{ fontSize: 20 }}
            />
        </SafeAreaViewWrapper>
    );
};
