import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants';

const searchImage = require('../assets/search.png');
const globeImage = require('../assets/globe.png');
const chevronsImage = require('../assets/chevrons-down.png');
const arrowImage = require('../assets/arrow-down.png');

export const CustomIcons = () => {
    return (
        <SafeAreaViewWrapper>
            <Text style={{ marginBottom: 20 }}>Custom left icon</Text>
            <Select
                styles={{
                    select: {
                        width: 180,
                        marginBottom: 20,
                        leftIcon: {
                            height: 20,
                            width: 20,
                        },
                    },
                }}
                options={DATA}
                selectLeftIconImageProps={{ source: globeImage }}
            />
            <Select
                styles={{
                    select: {
                        width: 250,
                        marginBottom: 20,
                        leftIcon: {
                            height: 25,
                            width: 25,
                        },
                    },
                }}
                options={DATA}
                placeholderText="Search..."
                searchable={true}
                selectLeftIconImageProps={{ source: searchImage }}
            />
            <Text style={{ marginBottom: 20 }}>Custom select control arrow</Text>
            <Select
                styles={{
                    select: {
                        width: 250,
                        marginBottom: 20,
                        arrow: {
                            icon: { height: 25, width: 25 },
                        },
                    },
                }}
                options={DATA}
                arrowImageProp={{ source: chevronsImage }}
            />
            <Select
                styles={{
                    select: {
                        width: 250,
                        marginBottom: 20,
                        arrow: {
                            icon: { height: 25, width: 25 },
                        },
                    },
                }}
                options={DATA}
                arrowImageProp={{ source: arrowImage }}
            />
        </SafeAreaViewWrapper>
    );
};
