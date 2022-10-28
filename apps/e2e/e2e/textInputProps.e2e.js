describe('TextInputProps', () => {
    it('should go to TextInputProps Screen and trigger onFocus and onBlur on input', async () => {
        //Scroll to TextInputProps button and press it
        await waitFor(element(by.text('TextInputProps')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(200, 'down');
        await element(by.text('TextInputProps')).tap();

        //Type search text and press option
        await expect(element(by.text('isFocused: false'))).toBeVisible();
        await element(by.label('Place text')).atIndex(0).typeText('Fourth');
        if (device.getPlatform() === 'android') {
            await device.pressBack();
        }
        await expect(element(by.text('isFocused: true'))).toBeVisible();
        await element(by.text('----Fourth label----')).tap();
        await expect(element(by.text('isFocused: false'))).toBeVisible();
        await expect(element(by.text('----Fourth label----')).atIndex(0)).toBeVisible();
    });
});
