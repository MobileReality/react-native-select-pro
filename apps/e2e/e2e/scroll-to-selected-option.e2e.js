describe('ScrollToSelectedOption', () => {
    it('should go to ScrollToSelectedOption Screen and check if dropdown scroll to selected option', async () => {
        await waitFor(element(by.text('Scroll To Selected Option')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(200, 'down');
        await element(by.text('Scroll To Selected Option')).tap();
        await element(by.text('🐈🐈🐈 Fifth label')).tap();
        await expect(
            element(by.label('Choose 🐈🐈🐈 Fifth label option')).atIndex(0),
        ).toBeVisible();
        await element(by.text('🐈🐈🐈 Fifth label')).atIndex(0).tap();
    });

    it('should not scroll to selected option', async () => {
        await element(by.text('Select...')).atIndex(1).tap();
        await waitFor(element(by.text('Last')))
            .toBeVisible()
            .whileElement(by.id('Options list'))
            .scroll(200, 'down');
        await element(by.text('Last')).tap();
        await expect(element(by.text('Last'))).toBeVisible();
        await element(by.text('Last')).tap();
        await expect(element(by.label('Choose First label option')).atIndex(0)).toBeVisible();
        await element(by.text('First label')).tap();
    });
});
