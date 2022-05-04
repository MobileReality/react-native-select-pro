describe('Basic', () => {
    it('should go to Basic Screen and select last option and then clear it ', async () => {
        await element(by.text('Basic')).tap();
        await element(by.text('Select...')).tap();
        await element(by.text('First label')).swipe('up');
        await element(by.text('Last')).tap();
        await expect(element(by.text('Last'))).toExist();
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
        await expect(element(by.text('Select...'))).toExist();
    });
});
