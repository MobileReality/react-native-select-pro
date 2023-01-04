import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { SECTIONS_DATA } from '../constants/data';

export const SectionsWithMultiSelect = () => {
    return (
        <SafeAreaViewWrapper>
            <Select
                options={SECTIONS_DATA}
                multiSelection={true}
                styles={{
                    width: 200,
                    sectionHeader: {
                        backgroundColor: 'gainsboro',
                        selected: { backgroundColor: 'cadetblue' },
                        selectedText: { color: 'azure' },
                        clearIcon: { tintColor: 'azure' },
                    },
                }}
                onSectionSelect={() => {}}
                onSectionRemove={() => {}}
            />
        </SafeAreaViewWrapper>
    );
};
