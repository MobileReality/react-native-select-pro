describe('Searchable', () => {
    it('should go to Searchable Screen and search for option ----Fourth label----', async () => {
        //Scroll to Searchable button and press it
        await waitFor(element(by.text('Searchable')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(100, 'down');
        await element(by.text('Searchable')).tap();

        //Type search text and press option
        await element(by.label('Place text')).atIndex(0).typeText('Fourth');
        await element(by.text('----Fourth label----')).tap();
        await expect(element(by.text('----Fourth label----'))).toExist();
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
    });

    it('should search with wrong text', async () => {
        await element(by.label('Place text')).atIndex(0).typeText('Test');
        await expect(element(by.text('No options'))).toExist();
    });
});
