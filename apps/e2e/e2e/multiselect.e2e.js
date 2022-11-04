describe('MultiSelect', () => {
    it('should go to MultiSelect Screen and select four options and then clear all of them', async () => {
        //Scroll to Multi Select button and press it
        await waitFor(element(by.text('MultiSelect')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(200, 'down');
        await element(by.text('MultiSelect')).tap();

        //Select four elements one by one from the dropdown list
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await element(by.text('First label')).tap();
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await element(by.text('Second label in options list.')).tap();
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await element(by.text('THIRD LABEL')).tap();
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await waitFor(element(by.text('----Fourth label----')))
            .toBeVisible()
            .whileElement(by.id('Options list'))
            .scroll(100, 'down');
        await element(by.text('----Fourth label----')).tap();
        await expect(element(by.text('First label'))).toExist();
        await expect(element(by.text('THIRD LABEL'))).toExist();
        await expect(element(by.text('Second label in options list.'))).toExist();
        await expect(element(by.text('----Fourth label----'))).toExist();

        //Clear all of the options
        await element(by.text('First label')).tap();
        await element(by.text('Second label in options list.')).tap();
        await element(by.text('THIRD LABEL')).tap();
        await element(by.text('----Fourth label----')).tap();
        await expect(element(by.text('Select...'))).toBeVisible();
    });
});
