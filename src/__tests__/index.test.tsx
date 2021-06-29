import React from 'react';
import { render } from '@testing-library/react-native';

import { Test } from '../index';

describe('Test', () => {
    it('should generate snapshot component', () => {
        const wrapper = render(<Test title={'This is a test'} />);
        expect(wrapper).toMatchSnapshot();
    });
});
