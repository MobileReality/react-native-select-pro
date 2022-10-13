import React from 'react';
import { Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';
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
                selectControlStyles={{
                    customLeftIconStyles: {
                        iconStyle: { height: 20, width: 20 },
                        iconSource: globeImage,
                    },
                }}
                options={DATA}
                containerStyle={{ width: 180, marginBottom: 20 }}
            />
            <Select
                selectControlStyles={{
                    customLeftIconStyles: {
                        iconStyle: { height: 25, width: 25 },
                        iconSource: searchImage,
                    },
                }}
                options={DATA}
                placeholderText="Search..."
                searchable={true}
                containerStyle={{ width: 250, marginBottom: 20 }}
                animated={true}
            />
            <Text style={{ marginBottom: 20 }}>Custom select control arrow</Text>
            <Select
                selectControlStyles={{
                    arrowIconStyles: {
                        iconStyle: { height: 25, width: 25 },
                        iconSource: chevronsImage,
                    },
                }}
                containerStyle={{ width: 250, marginBottom: 20 }}
                options={DATA}
            />
            <Select
                selectControlStyles={{
                    arrowIconStyles: {
                        iconStyle: { height: 25, width: 25 },
                        iconSource: arrowImage,
                    },
                }}
                containerStyle={{ width: 250, marginBottom: 20 }}
                options={DATA}
                animated={true}
            />
        </SafeAreaViewWrapper>
    );
};
