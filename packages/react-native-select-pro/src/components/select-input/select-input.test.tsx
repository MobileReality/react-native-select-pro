import React from 'react';
import { render } from '@testing-library/react-native';

import { SelectInput } from './select-input';

describe('SelectInput', () => {
    it('should generate SelectInput snapshot', () => {
        const selectInput = render(<SelectInput selectedOption={null} textStyle={{}} />);
        expect(selectInput).toMatchSnapshot();
    });
});
