import React from 'react';
import { render } from '@testing-library/react-native';

import { SelectProvider } from '../select-provider';

import { OptionsList } from './options-list';

describe('OptionsList', () => {
    it('should generate OptionsList snapshot', () => {
        const optionsList = render(
            <SelectProvider>
                <OptionsList />
            </SelectProvider>,
        );
        expect(optionsList).toMatchSnapshot();
    });
});
