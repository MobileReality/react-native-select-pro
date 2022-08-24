describe('Categorized', () => {
    it('should go to Categorized Screen and select last option and then clear it', async () => {
        await element(by.text('Categorized')).tap();
        await element(by.text('Select...')[0]).tap();
        await element(by.text('EUROPE')).swipe('up');
        await element(by.text('Brazil')).tap();
        await expect(element(by.text('Brazil'))).toExist();
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
        await expect(element(by.text('Select...'))).toExist();
    });
});
