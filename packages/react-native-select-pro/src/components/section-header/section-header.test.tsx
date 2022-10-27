import React from 'react';
import { render } from '@testing-library/react-native';

import { SectionHeader } from './section-header';

describe('SectionHeader', () => {
    it('should generate SectionHeader snapshot', () => {
        const sectionHeader = render(
            <SectionHeader
                title="Test Section"
                sectionHeaderTextStyle={undefined}
                sectionHeaderContainerStyle={undefined}
            />,
        );
        expect(sectionHeader).toMatchSnapshot();
    });
});
