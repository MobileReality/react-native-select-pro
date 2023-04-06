import React from 'react';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const Basic = () => {
    return (
        <SafeAreaViewWrapper>
            <Select options={DATA} />
            <Select options={DATA} defaultOption={DATA[2]} />
            <Select
                options={DATA}
                defaultOption={{
                    value: '84bc47cd-c8ab-4673-b428-3d96876f0a3f',
                    label: 'THIRD LABEL',
                }}
            />
        </SafeAreaViewWrapper>
    );
};
