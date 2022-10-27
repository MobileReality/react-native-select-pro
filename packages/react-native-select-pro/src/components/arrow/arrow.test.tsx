import React from 'react';
import { render } from '@testing-library/react-native';

import { ANIMATION_DURATION } from '../../constants/styles';

import { Arrow } from './arrow';

describe('Arrow', () => {
    it('should generate Arrow snapshot', () => {
        const arrow = render(
            <Arrow
                isOpened={true}
                disabled={false}
                animation={ANIMATION_DURATION}
                multiSelection={false}
                arrowIconStyles={{}}
                onPressSelectControl={() => {}}
            />,
        );
        expect(arrow).toMatchSnapshot();
    });
});
