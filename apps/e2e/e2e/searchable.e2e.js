describe('Searchable', () => {
    it('should go to Searchable Screen and search for option ----Fourth label----', async () => {
        //Scroll to Searchable button and press it
        await waitFor(element(by.text('Searchable')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(200, 'down');
        await element(by.text('Searchable')).tap();

        //Type search text and press option
        await element(by.label('Place text')).atIndex(0).typeText('Fourth');
        if (device.getPlatform() === 'android') {
            await device.pressBack();
        }
        await element(by.text('----Fourth label----')).tap();
        await expect(element(by.text('----Fourth label----')).atIndex(0)).toBeVisible();
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
    });

    it('should search without results and show "No options" placeholder', async () => {
        await element(by.label('Place text')).atIndex(0).typeText('Test');
        await expect(element(by.text('No options'))).toBeVisible();
    });
});
