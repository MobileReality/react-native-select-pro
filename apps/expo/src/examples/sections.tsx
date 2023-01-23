import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { SECTIONS_DATA } from '../constants/data';

export const Sections = () => {
    return (
        <SafeAreaViewWrapper>
            <Select
                styles={{
                    sectionHeader: {
                        container: {
                            backgroundColor: 'lightblue',
                        },
                        text: { color: 'darkblue' },
                    },
                }}
                options={SECTIONS_DATA}
                sectionListProps={{ bounces: true }}
            />
        </SafeAreaViewWrapper>
    );
};
