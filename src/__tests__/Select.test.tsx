import React from 'react';
import { MeasureOnSuccessCallback, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { Select } from '../components/select';
import { SelectProvider } from '../components/select-provider';

const DATA = [
    {
        value: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        label: 'First Option',
    },
    {
        value: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        label: 'Second Option',
    },
    {
        value: '58694a0f-3da1-471f-bd96-145571e29d72',
        label: 'Third Option',
    },
];

const SEARCHABLE_DATA = [
    {
        value: 'test1',
        label: 'Fist test options',
    },
    {
        value: 'test2',
        label: 'Second test options',
    },
    {
        value: 'test3',
        label: 'Third test option',
    },
];

describe('Select', () => {
    it('should generate Select snapshot', () => {
        const wrapper = render(
            <SelectProvider>
                <Select options={DATA} />
            </SelectProvider>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    jest.spyOn(View.prototype, 'measure').mockImplementation(
        (fn: MeasureOnSuccessCallback): void => {
            fn(0, 0, 45, 20, 0, 0);
        },
    );

    it('should open options menu after press select control', () => {
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select options={DATA} />
            </SelectProvider>,
        );

        const open = getByA11yLabel('Open a dropdown');
        fireEvent.press(open);

        const list = getByA11yLabel('Options list');
        expect(list).toBeTruthy();
    });

    /**
     * to achieve this you need to pass `clearable={true}` and should be selected option
     */
    it('should show clear selected option button', () => {
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select clearable={true} options={DATA} />
            </SelectProvider>,
        );

        const open = getByA11yLabel('Open a dropdown');
        fireEvent.press(open);

        const optionPress = getByA11yLabel(`Choose ${DATA[0].label} option`);
        fireEvent.press(optionPress);

        const clearButton = getByA11yLabel('Clear a chosen option');
        expect(clearButton).toBeTruthy();
    });

    it('should close dropdown menu after pressed outside dropdown', () => {
        const { getByA11yLabel, queryByA11yLabel } = render(
            <SelectProvider>
                <Select options={DATA} />
            </SelectProvider>,
        );

        const open = getByA11yLabel('Open a dropdown');
        fireEvent.press(open);

        const listWrapper = queryByA11yLabel('Options list');
        expect(listWrapper).toBeTruthy();

        const outside = getByA11yLabel('Close a dropdown from outside');
        fireEvent.press(outside);

        const listWrapper2 = queryByA11yLabel('Options list');
        expect(listWrapper2).toBeFalsy();
    });

    it('should open options menu after pressing Pressable in select control with searchable enabled', () => {
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const open = getByA11yLabel('Open a dropdown');
        fireEvent.press(open);

        const list = getByA11yLabel('Options list');
        expect(list).toBeTruthy();
    });

    it('should open options menu after pressing Input in select control with searchable enabled', () => {
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const open = getByA11yLabel('Place text');
        fireEvent.press(open);

        const list = getByA11yLabel('Options list');
        expect(list).toBeTruthy();
    });

    it('should type text in Input in select control with searchable enabled', () => {
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const inputData = 'Testing messing';

        const input = getByA11yLabel('Place text');
        fireEvent.changeText(input, inputData);

        expect(input.props.value).toBe(inputData);
    });

    it('should not able to type text in Input in select control with searchable enabled but disabled', () => {
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select disabled={true} options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const inputData = 'Testing messing';

        const input = getByA11yLabel('Place text');
        fireEvent.changeText(input, inputData);

        expect(input.props.value).toBe('');
    });

    it('should, while searchable enabled, search by label and default pattern', () => {
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const firstInputData = 'Second test options';
        const secondInputData = 'Third test option';
        const thirdInputData = 'options';

        const input = getByA11yLabel('Place text');

        fireEvent.changeText(input, firstInputData);

        const list = getByA11yLabel('Options list');

        expect(list.props.data.length).toBe(1);

        fireEvent.changeText(input, secondInputData);
        expect(list.props.data.length).toBe(1);

        fireEvent.changeText(input, thirdInputData);
        expect(list.props.data.length).toBe(2);

        const valueData = 'test1';

        fireEvent.changeText(input, valueData);
        expect(list.props.data.length).toBe(0);
    });

    it('should, while searchable enabled, search by label and other patterns', () => {
        const searchPattern = (value: string) => `^${value}`;

        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchPattern={searchPattern} searchable={true} />
            </SelectProvider>,
        );

        const firstInputData = 'Second';
        const secondInputData = 'option';
        const input = getByA11yLabel('Place text');

        fireEvent.changeText(input, firstInputData);

        const list = getByA11yLabel('Options list');

        expect(list.props.data.length).toBe(1);

        fireEvent.changeText(input, secondInputData);
        expect(list.props.data.length).toBe(0);
    });
});
