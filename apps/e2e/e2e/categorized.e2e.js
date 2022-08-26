describe('Categorized', () => {
    it('should go to Categorized Screen and select last option in Default Select component and then clear it', async () => {
        await element(by.text('Categorized')).tap();
        await element(by.text('Select...')).atIndex(0).tap();
        await expect(element(by.text('EUROPE'))).toExist();
        await element(by.text('EUROPE')).swipe('up');
        await expect(element(by.text('Brazil 🇧🇷'))).toExist();
        await element(by.text('Brazil 🇧🇷')).tap();
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
    });

    it('should select pre last option in Custom Categories Select component and then clear it', async () => {
        await element(by.text('Select...')).atIndex(1).tap();
        await expect(element(by.text('Europe'))).toExist();
        await element(by.text('Europe')).swipe('up');
        await expect(element(by.text('Peru 🇵🇪'))).toExist();
        await element(by.text('Peru 🇵🇪')).tap();
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
    });
});
