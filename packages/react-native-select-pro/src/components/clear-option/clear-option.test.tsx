import React from 'react';

import { ClearOption } from './clear-option';

describe('ClearOption', () => {
    it('should generate ClearOption snapshot', () => {
        const clearOption = (
            <ClearOption
                selectControlClearOptionA11yLabel={undefined}
                disabled={false}
                clearOptionStyles={{}}
                onPressRemove={() => {}}
            />
        );
        expect(clearOption).toMatchSnapshot();
    });
});
