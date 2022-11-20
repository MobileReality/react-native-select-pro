import React from 'react';
import { render } from '@testing-library/react-native';

import { SelectControl } from './select-control';

describe('SelectControl', () => {
    it('should generate SelectControl snapshot', () => {
        const selectControl = render(<SelectControl ref={null} />);
        expect(selectControl).toMatchSnapshot();
    });
});
