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
                customLeftIconSource={globeImage}
                customLeftIconStyles={{ height: 20, width: 20 }}
                options={DATA}
                selectControlStyle={{ width: 180, marginBottom: 20 }}
            />
            <Select
                customLeftIconSource={searchImage}
                customLeftIconStyles={{ height: 25, width: 25 }}
                options={DATA}
                placeholderText="Search..."
                searchable={true}
                selectControlStyle={{ width: 250, marginBottom: 20 }}
                animated={true}
            />
            <Text style={{ marginBottom: 20 }}>
                Custom select control arrow
            </Text>
            <Select
                customSelectControlArrowIconSource={chevronsImage}
                selectControlArrowImageStyle={{ height: 25, width: 25 }}
                selectControlStyle={{ width: 250, marginBottom: 20 }}
                options={DATA}
            />
            <Select
                customSelectControlArrowIconSource={arrowImage}
                selectControlArrowImageStyle={{ height: 25, width: 25 }}
                selectControlStyle={{ width: 250, marginBottom: 20 }}
                options={DATA}
                animated={true}
            />
        </SafeAreaViewWrapper>
    );
};
