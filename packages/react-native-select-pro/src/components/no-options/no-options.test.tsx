import React from 'react';
import { render } from '@testing-library/react-native';

import { NoOptions } from './no-options';

describe('NoOptions', () => {
    it('should generate NoOptions snapshot', () => {
        const noOptions = render(<NoOptions />);
        expect(noOptions).toMatchSnapshot();
    });
});
