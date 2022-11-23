import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants';

export const CustomStyles = () => {
    return (
        <SafeAreaViewWrapper style={{ margin: 20, marginTop: 500 }}>
            <Select
                styles={{
                    select: {
                        width: 250,
                        backgroundColor: 'lightblue',
                        height: 80,
                        text: {
                            fontSize: 20,
                            color: 'white',
                        },
                        arrow: {
                            icon: { tintColor: 'pink' },
                        },
                    },
                    optionsList: {
                        maxHeight: 150,
                    },
                    option: {
                        backgroundColor: 'lightcoral',
                        borderBottomWidth: 1,
                        height: 40,
                        text: {
                            fontSize: 20,
                        },
                        selected: {
                            backgroundColor: 'lightgreen',
                        },
                    },
                }}
                options={DATA}
                placeholderTextColor="blue"
            />
        </SafeAreaViewWrapper>
    );
};
