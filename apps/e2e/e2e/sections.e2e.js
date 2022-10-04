describe('Sections', () => {
    it('should go to Sections Screen and select last option and then clear it', async () => {
        await waitFor(element(by.text('Sections')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(200, 'down');
        await element(by.text('Sections')).tap();
        await element(by.text('Select...')).tap();
        await element(by.text('Canada')).tap();
        await expect(element(by.text('Canada'))).toExist();
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
        await expect(element(by.text('Select...'))).toExist();
    });
});
