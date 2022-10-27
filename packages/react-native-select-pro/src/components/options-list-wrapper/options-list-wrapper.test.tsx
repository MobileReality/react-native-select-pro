import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import { OptionsListWrapper } from './options-list-wrapper';

describe('OptionsListWrapper', () => {
    it('should generate OptionsListWrapper snapshot', () => {
        const optionsListWrapper = render(
            <OptionsListWrapper animation={false} isOpened={false} wrapperStyles={{}}>
                <View>
                    <Text>Test</Text>
                </View>
            </OptionsListWrapper>,
        );
        expect(optionsListWrapper).toMatchSnapshot();
    });
});
