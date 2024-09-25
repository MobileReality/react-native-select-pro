import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const MultiSelectWithSeparatedOptionsStyled = () => {
    return (
        <SafeAreaViewWrapper>
            <Select
                options={DATA}
                styles={{
                    select: {
                        multiSelectedOption: {
                            container: {
                                paddingHorizontal: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#19222f',
                                minHeight: 40,
                            },
                            text: {
                                fontSize: 14,
                                color: '#04e590',
                            },
                        },
                    },
                }}
                multiple={true}
                separatedMultiple={true}
                widthThreshold={110}
            />
        </SafeAreaViewWrapper>
    );
};
