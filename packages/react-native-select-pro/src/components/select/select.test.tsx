import React from 'react';

import { Select } from './select';

describe('Select', () => {
    it('should generate Select snapshot', () => {
        const data = [{ label: 'test', value: 'test' }];
        const select = <Select options={data} />;
        expect(select).toMatchSnapshot();
    });
});
