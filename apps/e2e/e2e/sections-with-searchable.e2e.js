describe('SectionsWithSearchable', () => {
    it('should go to SectionsWithSearchable Screen and search for option Poland', async () => {
        //Scroll to Sections with searchable button and press it
        await waitFor(element(by.text('Sections with Searchable')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(200, 'down');
        await element(by.text('Sections with Searchable')).tap();

        //Type search text and press option
        await element(by.label('Place text')).atIndex(0).typeText('Pol');
        if (device.getPlatform() === 'android') {
            await device.pressBack();
        }
        await element(by.text('Poland')).tap();
        await expect(element(by.text('Poland')).atIndex(0)).toBeVisible();
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
    });

    it('should search without results and show "No options" placeholder', async () => {
        await element(by.label('Place text')).atIndex(0).typeText('Test');
        await expect(element(by.text('No options'))).toBeVisible();
    });
});
