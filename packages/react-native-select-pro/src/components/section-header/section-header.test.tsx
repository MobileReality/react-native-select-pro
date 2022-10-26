import React from 'react';

import { SectionHeader } from './section-header';

describe('SectionHeader', () => {
    it('should generate SectionHeader snapshot', () => {
        const sectionHeader = (
            <SectionHeader
                title="Test Section"
                sectionHeaderTextStyle={undefined}
                sectionHeaderContainerStyle={undefined}
            />
        );
        expect(sectionHeader).toMatchSnapshot();
    });
});
