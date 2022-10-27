import React from 'react';
import { render } from '@testing-library/react-native';

import { SelectProvider } from '../select-provider';

import { Select } from './select';

describe('Select', () => {
    it('should generate Select snapshot', () => {
        const DATA = [{ label: 'test', value: 'test' }];
        const select = render(
            <SelectProvider>
                <Select options={DATA} />
            </SelectProvider>,
        );
        expect(select).toMatchSnapshot();
    });
});
