import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const CustomStyles = () => {
    return (
        <SafeAreaViewWrapper style={{ margin: 20, marginTop: 500 }}>
            <Select
                styles={{
                    select: {
                        container: {
                            width: 250,
                            backgroundColor: 'lightblue',
                            height: 80,
                        },
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
                        container: {
                            backgroundColor: 'lightcoral',
                            borderBottomWidth: 1,
                            height: 40,
                        },
                        text: {
                            fontSize: 20,
                        },
                        selected: {
                            container: {
                                backgroundColor: 'mediumseagreen',
                            },
                            text: { color: 'white' },
                        },
                        pressed: {
                            backgroundColor: 'lightblue',
                        },
                    },
                    backdrop: { backgroundColor: 'black', opacity: 0.3 },
                }}
                options={DATA}
                placeholderTextColor="blue"
            />
        </SafeAreaViewWrapper>
    );
};
