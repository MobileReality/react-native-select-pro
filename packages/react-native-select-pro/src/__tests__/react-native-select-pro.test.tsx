import React from 'react';
import type { MeasureOnSuccessCallback } from 'react-native';
import { View } from 'react-native';
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

const SECTIONS_DATA = [
    {
        title: 'North America',
        data: [
            {
                value: 'us',
                label: 'United States of America',
            },
            {
                value: 'ca',
                label: 'Canada',
            },
        ],
    },
    {
        title: 'Europe',
        data: [
            {
                value: 'pl',
                label: 'Poland',
            },
            {
                value: 'es',
                label: 'Spain',
            },
            {
                value: 'fr',
                label: 'France',
            },
        ],
    },
];

const SEARCHABLE_DATA = [
    {
        value: 'test1',
        label: 'First test option',
    },
    {
        value: 'test2',
        label: 'Second test option',
    },
    {
        value: 'test3',
        label: 'Third test option',
    },
];

const searchPattern = (value: string) => `^${value}`;

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.spyOn(View.prototype, 'measure').mockImplementation((fn: MeasureOnSuccessCallback): void => {
    fn(0, 0, 45, 20, 0, 0);
});

describe('Select', () => {
    it('should generate Select snapshot', () => {
        const wrapper = render(
            <SelectProvider>
                <Select options={DATA} />
            </SelectProvider>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should open options menu after press select control', () => {
        const { getByLabelText } = render(
            <SelectProvider>
                <Select options={DATA} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const list = getByLabelText('Options list');
        expect(list).toBeTruthy();
    });

    /**
     * to achieve this you need to pass `clearable={true}` and should be selected option
     */
    it('should show clear selected option button', () => {
        const { getByLabelText } = render(
            <SelectProvider>
                <Select clearable={true} options={DATA} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const optionPress = getByLabelText(`Select ${DATA[0].label}`);
        fireEvent.press(optionPress);

        const clearButton = getByLabelText('Clear a selected option');
        expect(clearButton).toBeTruthy();
    });

    it('should select option from section list', () => {
        const { getByLabelText } = render(
            <SelectProvider>
                <Select options={SECTIONS_DATA} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const optionPress = getByLabelText(`Select ${SECTIONS_DATA[0].data[0].label}`);
        fireEvent.press(optionPress);
    });

    it('should fire callbacks with right arguments after select and remove option', () => {
        const onSelect = jest.fn();
        const onRemove = jest.fn();
        const { getByLabelText } = render(
            <SelectProvider>
                <Select clearable={true} options={DATA} onSelect={onSelect} onRemove={onRemove} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const optionPress = getByLabelText(`Select ${DATA[1].label}`);
        fireEvent.press(optionPress);
        expect(onSelect).toBeCalledWith(DATA[1], 1);

        const clearButton = getByLabelText('Clear a selected option');
        fireEvent.press(clearButton);
        expect(onRemove).toBeCalledWith(DATA[1], 1);
    });

    it('should close dropdown menu after pressed outside dropdown', () => {
        const { getByLabelText, queryByLabelText } = render(
            <SelectProvider>
                <Select options={DATA} animation={false} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const listWrapper = queryByLabelText('Options list');
        expect(listWrapper).toBeTruthy();

        const outside = getByLabelText('Close a dropdown from outside');
        fireEvent.press(outside);

        const listWrapper2 = queryByLabelText('Options list');
        expect(listWrapper2).toBeFalsy();
    });

    it('should close options list after press selected option', () => {
        const { getByLabelText } = render(
            <SelectProvider>
                <Select options={DATA} pressableSelectedOption={true} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const optionPress = getByLabelText(`Select ${DATA[0].label}`);
        fireEvent.press(optionPress);

        const openAgain = getByLabelText('Open a dropdown');
        fireEvent.press(openAgain);

        const optionSelected = getByLabelText(`Select ${DATA[0].label}`);
        fireEvent.press(optionSelected);

        const canOpenDropdown = getByLabelText('Open a dropdown');
        expect(canOpenDropdown).toBeTruthy();
    });
});

describe('Select with searchable enabled', () => {
    it('should generate Select with searchable enabled snapshot', () => {
        const wrapper = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should open options menu after pressing Pressable in select control with searchable enabled', () => {
        const { getByLabelText } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const list = getByLabelText('Options list');
        expect(list).toBeTruthy();
    });

    it('should NOT open options menu after pressing Pressable or Input in select control with searchable enabled and whole select disabled', () => {
        const onOpen = jest.fn();

        const { getByLabelText } = render(
            <SelectProvider>
                <Select
                    disabled={true}
                    options={SEARCHABLE_DATA}
                    searchable={true}
                    onSelectOpened={onOpen}
                />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);
        expect(onOpen).not.toHaveBeenCalled();

        const testInput = getByLabelText('Place text');
        fireEvent.press(testInput);
        expect(onOpen).not.toHaveBeenCalled();
    });

    it('should open options menu after pressing Input in select control with searchable enabled', () => {
        const { getByLabelText } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const open = getByLabelText('Place text');
        fireEvent.press(open);

        const list = getByLabelText('Options list');
        expect(list).toBeTruthy();
    });

    it('should type text in Input in select control with searchable enabled', () => {
        const { getByLabelText } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const inputData = 'Testing messing';

        const input = getByLabelText('Place text');
        fireEvent.changeText(input, inputData);

        expect(input.props.value).toBe(inputData);
    });

    it('should not able to type text in Input in select control with searchable enabled but disabled', () => {
        const { getByLabelText } = render(
            <SelectProvider>
                <Select disabled={true} options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const inputData = 'Testing messing';

        const input = getByLabelText('Place text');
        fireEvent.changeText(input, inputData);

        expect(input.props.value).toBe('');
    });

    it('should, while searchable enabled, search by label and default pattern', () => {
        const { getByLabelText } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const firstInputData = 'Second test option';
        const secondInputData = 'Third test option';
        const thirdInputData = 'd test option';

        const input = getByLabelText('Place text');

        fireEvent.changeText(input, firstInputData);

        const list = getByLabelText('Options list');

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
        const { getByLabelText } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchPattern={searchPattern} searchable={true} />
            </SelectProvider>,
        );

        const firstInputData = 'Second';
        const secondInputData = 'option';
        const input = getByLabelText('Place text');

        fireEvent.changeText(input, firstInputData);

        const list = getByLabelText('Options list');

        expect(list.props.data.length).toBe(1);

        fireEvent.changeText(input, secondInputData);
        expect(list.props.data.length).toBe(0);
    });

    it('should, while searchable enabled, get back to previous value in select if clicked outside', () => {
        const { getByLabelText } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const inputData = 'Second';
        const nextInputData = 'option';

        const selectOptionInputData = 'Second test option';

        const input = getByLabelText('Place text');

        fireEvent.changeText(input, inputData);

        const list = getByLabelText('Options list');

        expect(list.props.data.length).toBe(1);

        const option = getByLabelText(`Select ${inputData} test option`);

        fireEvent.press(option);

        expect(input.props.value).toBe(selectOptionInputData);

        fireEvent.changeText(input, nextInputData);

        const listAgain = getByLabelText('Options list');
        expect(listAgain.props.data.length).toBeGreaterThan(1);
        expect(input.props.value).toBe(nextInputData);

        const outside = getByLabelText('Close a dropdown from outside');
        fireEvent.press(outside);

        expect(input.props.value).toBe(selectOptionInputData);
    });

    it('should fire onFocus and onBlur callbacks', () => {
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        const { getByLabelText } = render(
            <SelectProvider>
                <Select
                    options={SEARCHABLE_DATA}
                    searchable={true}
                    selectInputProps={{
                        onFocus,
                        onBlur,
                    }}
                />
            </SelectProvider>,
        );

        const input = getByLabelText('Place text');
        fireEvent(input, 'onFocus');
        expect(onFocus).toBeCalled();
        fireEvent(input, 'onBlur');
        expect(onBlur).toBeCalled();
    });

    it('should set properly option data after search and selected option', () => {
        const onSelect = jest.fn();

        const { getByLabelText } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} onSelect={onSelect} />
            </SelectProvider>,
        );

        const inputData = 'Third'; // exists in SEARCHABLE_DATA[2]

        const input = getByLabelText('Place text');
        fireEvent.changeText(input, inputData);

        const list = getByLabelText('Options list');
        expect(list.props.data.length).toBe(1);

        const option = getByLabelText(`Select ${inputData} test option`);
        fireEvent.press(option);
        expect(onSelect).toBeCalledWith(SEARCHABLE_DATA[2], 2);
    });
});

describe('Select with custom left icon', () => {
    it('should generate Select with custom left icon snapshot', () => {
        const wrapper = render(
            <SelectProvider>
                <Select
                    styles={{
                        select: {
                            leftIcon: {
                                height: 15,
                                width: 15,
                            },
                        },
                    }}
                    options={DATA}
                    selectLeftIconImageProps={{ source: require('./assets/search.png') }}
                />
            </SelectProvider>,
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Select with custom select control arrow icon', () => {
    it('should generate Select with custom select control arrow icon snapshot', () => {
        const wrapper = render(
            <SelectProvider>
                <Select
                    styles={{
                        select: {
                            arrow: {
                                icon: { height: 15, width: 15 },
                            },
                        },
                    }}
                    arrowImageProps={{
                        source: require('./assets/arrow-down.png'),
                    }}
                    options={DATA}
                />
            </SelectProvider>,
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Select with multi selection', () => {
    it('should generate Select with multi selection enabled snapshot', () => {
        const wrapper = render(
            <SelectProvider>
                <Select multiple={true} options={DATA} />
            </SelectProvider>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should, while multiple enabled, click and open options', () => {
        const { getByLabelText, queryByLabelText } = render(
            <SelectProvider>
                <Select multiple={true} options={DATA} animation={false} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const listWrapper = queryByLabelText('Options list');
        expect(listWrapper).toBeTruthy();

        const outside = getByLabelText('Close a dropdown from outside');
        fireEvent.press(outside);

        const listWrapper2 = queryByLabelText('Options list');
        expect(listWrapper2).toBeFalsy();
    });

    it('should, while multiple enabled, click should execute opening dropdown', () => {
        const { getByLabelText, queryByLabelText } = render(
            <SelectProvider>
                <Select multiple={true} options={DATA} animation={false} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const listWrapper = queryByLabelText('Options list');
        expect(listWrapper).toBeTruthy();

        const optionPress = getByLabelText(`Select ${DATA[0].label}`);
        fireEvent.press(optionPress);

        const optionSelected = getByLabelText(`${DATA[0].label} selected`);
        expect(optionSelected).toBeTruthy();

        const tryOpenAgain = getByLabelText('Open a dropdown');
        fireEvent.press(tryOpenAgain);

        const listWrapperShouldBeVisible = queryByLabelText('Options list');
        expect(listWrapperShouldBeVisible).toBeTruthy();
    });

    it('should, while multiple enabled, show, select and remove selected option', () => {
        const { getByLabelText, queryByLabelText } = render(
            <SelectProvider>
                <Select multiple={true} options={DATA} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const optionPress = getByLabelText(`Select ${DATA[0].label}`);
        fireEvent.press(optionPress);

        const optionSelected = getByLabelText(`${DATA[0].label} selected`);
        expect(optionSelected).toBeTruthy();

        const openAgain = getByLabelText('Open a dropdown');
        fireEvent.press(openAgain);

        const secondOptionPress = getByLabelText(`Select ${DATA[1].label}`);
        fireEvent.press(secondOptionPress);

        const selectedSecondOption = getByLabelText(`${DATA[1].label} selected`);
        expect(selectedSecondOption).toBeTruthy();

        fireEvent.press(optionSelected);

        const optionShouldNotExist = queryByLabelText(`${DATA[0].label} selected`);
        expect(optionShouldNotExist).toBeFalsy();
    });
    it('should NOT open options menu after pressing Pressable in select with multi select enabled and whole select disabled', () => {
        const onOpen = jest.fn();

        const { getByLabelText } = render(
            <SelectProvider>
                <Select disabled={true} multiple={true} options={DATA} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);
        expect(onOpen).not.toHaveBeenCalled();
    });
});

describe('Select with multi selection and searchable', () => {
    it('should generate Select with multi selection and searchable enabled snapshot', () => {
        const wrapper = render(
            <SelectProvider>
                <Select multiple={true} options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should, while multiple and searchable enabled, click and open options', () => {
        const { getByLabelText, getByPlaceholderText } = render(
            <SelectProvider>
                <Select multiple={true} options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const inputData = 'Second';
        const nextInputData = 'First';

        const input = getByLabelText('Place text');

        fireEvent.changeText(input, inputData);

        const list = getByLabelText('Options list');

        expect(list.props.data.length).toBe(1);

        const firstOption = getByLabelText(`Select ${inputData} test option`);

        fireEvent.press(firstOption);

        const inputAgain = getByLabelText('Place text');

        expect(inputAgain.props.value).toBe('');

        fireEvent.changeText(inputAgain, nextInputData);
        expect(inputAgain.props.value).toBe(nextInputData);

        const listAgain = getByLabelText('Options list');

        expect(listAgain.props.data.length).toBe(1);

        const secondOption = getByLabelText(`Select ${nextInputData} test option`);

        fireEvent.press(secondOption);

        const selectedFirstOption = getByLabelText(`${SEARCHABLE_DATA[1].label} selected`);
        expect(selectedFirstOption).toBeTruthy();
        const selectedSecondOption = getByLabelText(`${SEARCHABLE_DATA[0].label} selected`);
        expect(selectedSecondOption).toBeTruthy();

        const currentPlaceholderText = getByPlaceholderText('');
        expect(currentPlaceholderText).toBeTruthy();
    });
});
