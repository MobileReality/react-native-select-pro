import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { SECTIONS_DATA } from '../constants';

export const SectionsWithMultiSelect = () => {
    return (
        <SafeAreaViewWrapper>
            <Select
                options={SECTIONS_DATA}
                multiSelection={true}
                styles={{
                    width: 200,
                    optionsList: {
                        sectionHeader: {
                            backgroundColor: 'gainsboro',
                            selected: { backgroundColor: 'cadetblue' },
                            selectedText: { color: 'azure' },
                            selectedClearIcon: { tintColor: 'azure' },
                        },
                    },
                }}
            />
        </SafeAreaViewWrapper>
    );
};
