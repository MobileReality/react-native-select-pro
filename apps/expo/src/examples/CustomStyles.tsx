import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';
import { DATA } from '../constants';

export const CustomStyles = () => {
    return (
        <SafeAreaViewWrapper style={{ margin: 20, marginTop: 500 }}>
            <Select
                optionSelectedStyle={{ backgroundColor: 'lightgreen' }}
                optionStyle={{
                    backgroundColor: 'lightcoral',
                    borderBottomWidth: 1,
                    height: 40,
                }}
                optionTextStyle={{ fontSize: 20 }}
                options={DATA}
                optionsListStyle={{ maxHeight: 150 }}
                placeholderTextColor="blue"
                selectControlArrowImageStyle={{ tintColor: 'pink' }}
                selectControlStyle={{
                    width: 250,
                    backgroundColor: 'lightblue',
                    height: 80,
                }}
                selectControlTextStyle={{ fontSize: 20, color: 'white' }}
            />
        </SafeAreaViewWrapper>
    );
};
