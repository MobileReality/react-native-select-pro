import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';
import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';

const searchImage = require('../assets/search.png');
const globeImage = require('../assets/globe.png');

export const CustomLeftIcon = () => {
    return (
        <SafeAreaViewWrapper>
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
                placeholderText={'Search...'}
                searchable={true}
                selectControlStyle={{ width: 250, marginBottom: 20 }}
            />
        </SafeAreaViewWrapper>
    );
};
