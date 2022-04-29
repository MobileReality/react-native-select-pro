describe('Searchable', () => {
    it('should go to Searchable Screen and search for option ----Fourth label----', async () => {
        await waitFor(element(by.text('Searchable')))
            .toBeVisible()
            .whileElement(
                by.type(
                    device.getPlatform() === 'ios'
                        ? 'UIScrollView'
                        : 'android.widget.ScrollView',
                ),
            )
            .scroll(100, 'down');
        await element(by.text('Searchable')).tap();
        await element(by.label('Place text')).atIndex(0).tap();
        await element(by.label('Place text')).atIndex(0).typeText('Fourth');
        await element(by.text('----Fourth label----')).tap();
        await expect(element(by.text('----Fourth label----'))).toExist();
    });
});
