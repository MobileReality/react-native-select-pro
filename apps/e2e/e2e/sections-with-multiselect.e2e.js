describe('SectionsWithMultiSelect', () => {
    it('should go to SectionsWithMultiSelect Screen and select two options and then clear all of them', async () => {
        //Scroll to Sections with MultiSelect button and press it
        await waitFor(element(by.text('Sections with MultiSelect')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(200, 'down');
        await element(by.text('Sections with MultiSelect')).tap();

        //Select two elements one by one from the dropdown list
        await element(by.id('Dropdown arrow')).tap();
        await element(by.text('United States of America')).tap();
        await element(by.id('Dropdown arrow')).tap();
        await element(by.text('Canada')).tap();
        await expect(element(by.label('United States of America selected'))).toExist();
        await expect(element(by.label('Canada selected'))).toExist();

        //Clear all of the options
        await element(by.label('United States of America selected')).tap();
        await element(by.label('Canada selected')).atIndex(0).tap();
        await expect(element(by.text('Select...'))).toBeVisible();
    });

    it('should select whole section by pressing section header and then clear options by pressing section header second time', async () => {
        await element(by.id('Dropdown arrow')).tap();
        await element(by.text('North America')).tap();
        await expect(element(by.label('United States of America selected'))).toExist();
        await expect(element(by.label('Canada selected'))).toExist();
        await element(by.id('Dropdown arrow')).tap();
        await element(by.text('North America')).tap();
        await expect(element(by.text('Select...'))).toBeVisible();
    });
});
