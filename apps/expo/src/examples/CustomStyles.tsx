import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';
import { DATA } from '../constants';

export const CustomStyles = () => {
    return (
        <SafeAreaViewWrapper style={{ margin: 20, marginTop: 500 }}>
            <Select
                optionsListStyles={{
                    optionSelectedStyle: { backgroundColor: 'lightgreen' },
                    optionStyle: {
                        backgroundColor: 'lightcoral',
                        borderBottomWidth: 1,
                        height: 40,
                    },
                    optionTextStyle: { fontSize: 20 },
                    containerStyle: { maxHeight: 150 },
                }}
                options={DATA}
                placeholderTextColor="blue"
                selectControlStyles={{
                    containerStyle: {
                        width: 250,
                        backgroundColor: 'lightblue',
                        height: 80,
                    },
                    textStyle: { fontSize: 20, color: 'white' },
                    arrowIconStyles: {
                        iconStyle: { tintColor: 'pink' },
                    },
                }}
            />
        </SafeAreaViewWrapper>
    );
};
