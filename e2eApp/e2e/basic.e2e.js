describe('Basic', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should go to Basic Screen and select third option', async () => {
        await element(by.text('Basic')).tap();
        await element(by.text('Select...')).tap();
        await element(by.text('THIRD LABEL')).tap();
        await expect(element(by.text('THIRD LABEL'))).toExist();
    });

    it('should go to Basic Screen, select third option and clear it', async () => {
        await element(by.text('Basic')).tap();
        await element(by.text('Select...')).tap();
        await element(by.text('THIRD LABEL')).tap();
        await expect(element(by.text('THIRD LABEL'))).toExist();
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
        await expect(element(by.text('Select...'))).toExist();
    });
});
