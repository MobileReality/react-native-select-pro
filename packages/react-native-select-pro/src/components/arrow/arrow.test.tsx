import React from 'react';

import { ANIMATION_DURATION } from '../../constants/styles';

import { Arrow } from './arrow';

describe('Arrow', () => {
    it('should generate Arrow snapshot', () => {
        const arrow = (
            <Arrow
                isOpened={true}
                disabled={false}
                animation={ANIMATION_DURATION}
                multiSelection={false}
                iconStyle={{}}
                iconSource={{}}
                onPressSelectControl={() => {}}
            />
        );
        expect(arrow).toMatchSnapshot();
    });
});
