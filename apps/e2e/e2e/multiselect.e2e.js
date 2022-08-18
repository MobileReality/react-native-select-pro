describe('Multi Select', () => {
    it('should go to Multi Select Screen and select four options and then clear all of them', async () => {
        //Scroll to Multi Select button and press it
        await waitFor(element(by.text('Multi Select')))
            .toBeVisible()
            .whileElement(by.id('Examples List'))
            .scroll(100, 'down');
        await element(by.text('Multi Select')).tap();

        //Select four elements one by one from the dropdown list
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await element(by.text('First label')).tap();
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await element(by.text('Second label in options list.')).tap();
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await element(by.text('THIRD LABEL')).tap();
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await element(by.text('THIRD LABEL')).atIndex(1).swipe('up');
        await element(by.text('----Fourth label----')).tap();
        await expect(element(by.text('First label'))).toExist();
        await expect(element(by.text('THIRD LABEL'))).toExist();
        await expect(
            element(by.text('Second label in options list.')),
        ).toExist();
        await expect(element(by.text('----Fourth label----'))).toExist();

        //Swipe to the last element in input and clear all of them beginning from the last
        await element(by.text('First label')).swipe('left');
        await element(by.text('----Fourth label----')).tap();
        await element(by.text('THIRD LABEL')).tap();
        await element(by.text('Second label in options list.')).tap();
        await element(by.text('First label')).tap();
        await expect(element(by.text('Select...'))).toExist();
    });
});
