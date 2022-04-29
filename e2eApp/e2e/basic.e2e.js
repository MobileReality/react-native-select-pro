describe('Basic', () => {
    it('should go to Basic Screen and select third option and then clear it ', async () => {
        await element(by.text('Basic')).tap();
        await element(by.text('Select...')).tap();
        await element(by.text('THIRD LABEL')).tap();
        await expect(element(by.text('THIRD LABEL'))).toExist();
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
        await expect(element(by.text('Select...'))).toExist();
    });
});
