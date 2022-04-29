describe('Multi Select', () => {
    it('should go to Multi Select Screen and select three options and then clear all of them', async () => {
        await waitFor(element(by.text('Multi Select')))
            .toBeVisible()
            .whileElement(
                by.type(
                    device.getPlatform() === 'ios'
                        ? 'UIScrollView'
                        : 'android.widget.ScrollView',
                ),
            )
            .scroll(100, 'down');
        await element(by.text('Multi Select')).tap();
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await element(by.text('First label')).tap();
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await element(by.text('Second label in options list.')).tap();
        await element(by.label('Arrow for opening dropdown')).atIndex(0).tap();
        await element(by.text('THIRD LABEL')).tap();
        await expect(element(by.text('First label'))).toExist();
        await expect(element(by.text('THIRD LABEL'))).toExist();
        await expect(
            element(by.text('Second label in options list.')),
        ).toExist();

        await element(by.text('First label')).tap();
        await element(by.text('Second label in options list.')).tap();
        await element(by.text('THIRD LABEL')).tap();
        await expect(element(by.text('Select...'))).toExist();
    });
});
