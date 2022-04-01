describe('Searchable', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should go to Searchable Screen and search for option', async () => {
        await element(by.text('Searchable')).tap();
        await element(by.label('Place text')).atIndex(0).tap();
        await element(by.label('Place text')).atIndex(0).typeText('Fourth');
        await element(by.text('----Fourth label----')).tap();
        await expect(element(by.text('----Fourth label----'))).toExist();
    });
});
