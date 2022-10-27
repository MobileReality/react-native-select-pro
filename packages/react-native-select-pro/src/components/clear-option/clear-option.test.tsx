import React from 'react';
import { render } from '@testing-library/react-native';

import { ClearOption } from './clear-option';

describe('ClearOption', () => {
    it('should generate ClearOption snapshot', () => {
        const clearOption = render(
            <ClearOption
                selectControlClearOptionA11yLabel={undefined}
                disabled={false}
                clearOptionStyles={{}}
                onPressRemove={() => {}}
            />,
        );
        expect(clearOption).toMatchSnapshot();
    });
});
