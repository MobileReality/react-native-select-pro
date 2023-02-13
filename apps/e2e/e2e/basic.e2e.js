describe('Basic', () => {
    it('should go to Basic Screen and select last option and then clear it', async () => {
        await element(by.text('Basic')).tap();
        await element(by.text('Select...')).tap();
        await waitFor(element(by.text('Last')))
            .toBeVisible()
            .whileElement(by.id('Options list'))
            .scroll(200, 'down');
        await element(by.text('Last')).tap();
        await expect(element(by.text('Last')).atIndex(0)).toBeVisible();
        await element(by.label('Clear a selected option')).atIndex(1).tap();
        await expect(element(by.text('Select...'))).toBeVisible();
    });
});
