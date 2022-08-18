const expectedSelectedOption = {
    value: '0b8e1c91-e6d5-487e-bac5-8e1193d2e6f7',
    label: 'Last',
};

describe('Callbacks', () => {
    it('should go to Callbacks Screen and select last option (onSelect callback fired) and then clear it (onRemove callback fired)', async () => {
        await element(by.text('Callbacks')).tap();
        //Select option to fire onSelect event
        await element(by.text('Select...')).tap();
        await element(by.text('First label')).swipe('up');
        await element(by.text('Last')).tap();
        await expect(
            element(
                by.text(
                    `Selected item: ${JSON.stringify(
                        expectedSelectedOption,
                        null,
                        4,
                    )}`,
                ),
            ),
        ).toExist();
        await expect(element(by.text('Selected index: 5'))).toExist();
        //Clear option to fire onRemove event
        await element(by.label('Clear a chosen option')).atIndex(0).tap();
        await expect(
            element(
                by.text(
                    `Removed item: ${JSON.stringify(
                        expectedSelectedOption,
                        null,
                        4,
                    )}`,
                ),
            ),
        ).toExist();
        await expect(element(by.text('Removed index: 5'))).toExist();
    });
});
