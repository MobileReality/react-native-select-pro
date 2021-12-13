import React from 'react';
import { SafeAreaView } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

const searchImage = require('../assets/search.png');
const globeImage = require('../assets/globe.png');

export const CustomLeftIcon = () => {
    return (
        <SafeAreaView>
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
        </SafeAreaView>
    );
};
