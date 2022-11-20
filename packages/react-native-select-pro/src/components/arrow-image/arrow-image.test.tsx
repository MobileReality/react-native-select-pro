import React from 'react';
import { render } from '@testing-library/react-native';

import { ArrowImage } from './arrow-image';

describe('ArrowImage', () => {
    it('should generate ArrowImage snapshot', () => {
        const arrowImage = render(<ArrowImage />);
        expect(arrowImage).toMatchSnapshot();
    });
});
