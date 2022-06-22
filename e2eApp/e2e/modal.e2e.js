describe('Modal', () => {
    it('should go to Modal Screen, open modal, select options, and then hide modal ', async () => {
        await element(by.text('Modal')).tap();
        await element(by.text('Show Modal')).tap();
        await element(by.text('Select...')).atIndex(0).tap();
        await element(by.text('First label')).atIndex(0).tap();
        await element(by.text('Hide Modal')).tap();
        await expect(element(by.text('Hide Modal'))).not.toExist();
    });
});
