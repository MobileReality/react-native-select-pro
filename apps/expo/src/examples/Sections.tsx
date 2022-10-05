import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/SafeAreaViewWrapper';
import { SECTIONS_DATA } from '../constants';

export const Sections = () => {
    return (
        <SafeAreaViewWrapper>
            <Select
                sectionHeaderContainerStyle={{ backgroundColor: 'lightblue' }}
                sectionHeaderTextStyle={{
                    color: 'darkblue',
                }}
                options={SECTIONS_DATA}
                sectionListProps={{ bounces: true }}
                selectControlStyle={{ width: 200 }}
            />
        </SafeAreaViewWrapper>
    );
};
