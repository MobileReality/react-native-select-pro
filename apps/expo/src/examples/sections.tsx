import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { SECTIONS_DATA } from '../constants';

export const Sections = () => {
    return (
        <SafeAreaViewWrapper>
            <Select
                optionsListStyles={{
                    sectionHeaderContainerStyle: { backgroundColor: 'lightblue' },
                    sectionHeaderTextStyle: {
                        color: 'darkblue',
                    },
                }}
                options={SECTIONS_DATA}
                sectionListProps={{ bounces: true }}
                containerStyle={{ width: 200 }}
            />
        </SafeAreaViewWrapper>
    );
};
