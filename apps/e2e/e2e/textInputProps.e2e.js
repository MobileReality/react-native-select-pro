describe('TextInputProps', () => {
    it('should go to TextInputProps Screen and trigger onFocus and onBlur on input', async () => {
        //Scroll to TextInputProps button and press it
        await waitFor(element(by.text('TextInputProps')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(100, 'down');
        await element(by.text('TextInputProps')).tap();

        //Type search text and press option
        await expect(element(by.text('isFocused: false'))).toExist();
        await element(by.label('Place text')).atIndex(0).typeText('Fourth');
        await expect(element(by.text('isFocused: true'))).toExist();
        await element(by.text('----Fourth label----')).tap();
        await expect(element(by.text('isFocused: false'))).toExist();
        await expect(element(by.text('----Fourth label----'))).toExist();
    });
});
