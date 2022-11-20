import React from 'react';
import { render } from '@testing-library/react-native';

import { ClearOption } from './clear-option';

describe('ClearOption', () => {
    it('should generate ClearOption snapshot', () => {
        const clearOption = render(<ClearOption onPressRemove={() => {}} />);
        expect(clearOption).toMatchSnapshot();
    });
});
