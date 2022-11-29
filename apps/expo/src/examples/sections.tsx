import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { SECTIONS_DATA } from '../constants';

export const Sections = () => {
    return (
        <SafeAreaViewWrapper>
            <Select
                styles={{
                    width: 200,
                    optionsList: {
                        sectionHeader: {
                            backgroundColor: 'lightblue',
                            text: { color: 'darkblue' },
                        },
                    },
                }}
                options={SECTIONS_DATA}
                sectionListProps={{ bounces: true }}
            />
        </SafeAreaViewWrapper>
    );
};
