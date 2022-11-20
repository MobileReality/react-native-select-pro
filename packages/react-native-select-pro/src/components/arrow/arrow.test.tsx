import React from 'react';
import { render } from '@testing-library/react-native';

import { Arrow } from './arrow';

describe('Arrow', () => {
    it('should generate Arrow snapshot', () => {
        const arrow = render(<Arrow />);
        expect(arrow).toMatchSnapshot();
    });
});
