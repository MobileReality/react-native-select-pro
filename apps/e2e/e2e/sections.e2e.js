describe('Sections', () => {
    it('should go to Sections Screen and select last option and then clear it', async () => {
        await waitFor(element(by.text('Sections')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(200, 'down');
        await element(by.text('Sections')).tap();
        await element(by.text('Select...')).tap();
        await element(by.text('Canada')).tap();
        await expect(element(by.text('Canada')).atIndex(0)).toBeVisible();
        await element(by.label('Clear a selected option')).atIndex(1).tap();
        await expect(element(by.text('Select...'))).toBeVisible();
    });

    it('should scroll to selected option', async () => {
        await element(by.text('Select...')).tap();
        await element(by.text('North America')).swipe('up');
        await element(by.text('Spain')).tap();
        await expect(element(by.text('Spain')).atIndex(0)).toBeVisible();
        await element(by.text('Spain')).atIndex(0).tap();
        if (device.getPlatform() === 'ios') {
            await expect(element(by.label('Europe'))).toBeVisible();
        }
        await expect(element(by.label('Select Spain')).atIndex(0)).toBeVisible();
        await expect(element(by.label('Select France')).atIndex(0)).toBeVisible();
    });
});
