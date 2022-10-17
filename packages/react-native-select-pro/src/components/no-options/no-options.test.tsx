import React from 'react';

import { NoOptions } from './no-options';

describe('NoOptions', () => {
    it('should generate NoOptions snapshot', () => {
        const noOptions = <NoOptions noOptionsText="Test" />;
        expect(noOptions).toMatchSnapshot();
    });
});
