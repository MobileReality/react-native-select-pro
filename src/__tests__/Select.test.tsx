import React from 'react';
import { MeasureOnSuccessCallback, Pressable, Text, View } from 'react-native';
import type { OptionComponentProps } from '@mobile-reality/react-native-select-pro';
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
        label: 'First test options',
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

const searchPattern = (value: string) => `^${value}`;

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

    it('should select option with custom option component', () => {
        const MyCustomOption = ({
            onPressOption,
            option,
        }: OptionComponentProps) => {
            return (
                <Pressable accessibilityLabel="Option" onPress={onPressOption}>
                    <Text>{option.label}</Text>
                </Pressable>
            );
        };
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select
                    OptionComponent={(props) => <MyCustomOption {...props} />}
                    options={[DATA[0]]}
                />
            </SelectProvider>,
        );

        const open = getByA11yLabel('Open a dropdown');
        fireEvent.press(open);

        const list = getByA11yLabel('Options list');
        expect(list).toBeTruthy();

        const option = getByA11yLabel('Option');
        fireEvent.press(option);
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

    it('should NOT open options menu after pressing Pressable or Input in select control with searchable enabled and whole select disabled', () => {
        const onOpen = jest.fn();

        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select
                    disabled={true}
                    options={SEARCHABLE_DATA}
                    searchable={true}
                    onDropdownOpened={onOpen}
                />
            </SelectProvider>,
        );

        const open = getByA11yLabel('Open a dropdown');
        fireEvent.press(open);
        expect(onOpen).not.toHaveBeenCalled();

        const testInput = getByA11yLabel('Place text');
        fireEvent.press(testInput);
        expect(onOpen).not.toHaveBeenCalled();
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
                <Select
                    disabled={true}
                    options={SEARCHABLE_DATA}
                    searchable={true}
                />
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
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select
                    options={SEARCHABLE_DATA}
                    searchPattern={searchPattern}
                    searchable={true}
                />
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

    it('should, while searchable enabled, get back to previous value in select if clicked outside', () => {
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select options={SEARCHABLE_DATA} searchable={true} />
            </SelectProvider>,
        );

        const inputData = 'Second';
        const nextInputData = 'option';

        const selectOptionInputData = 'Second test options';

        const input = getByA11yLabel('Place text');

        fireEvent.changeText(input, inputData);

        const list = getByA11yLabel('Options list');

        expect(list.props.data.length).toBe(1);

        const option = getByA11yLabel(
            `Choose ${inputData} test options option`,
        );

        fireEvent.press(option);

        expect(input.props.value).toBe(selectOptionInputData);

        fireEvent.changeText(input, nextInputData);

        const listAgain = getByA11yLabel('Options list');
        expect(listAgain.props.data.length).toBeGreaterThan(1);
        expect(input.props.value).toBe(nextInputData);

        const outside = getByA11yLabel('Close a dropdown from outside');
        fireEvent.press(outside);

        expect(input.props.value).toBe(selectOptionInputData);
    });
});

describe('Select with custom left icon', () => {
    it('should generate Select with custom left icon snapshot', () => {
        const wrapper = render(
            <SelectProvider>
                <Select
                    customLeftIconSource={require('./assets/search.png')}
                    // eslint-disable-next-line react-native/no-inline-styles
                    customLeftIconStyles={{ height: 15, width: 15 }}
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
                <Select multiSelection={true} options={DATA} />
            </SelectProvider>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should, while multiSelection enabled, click and open options', () => {
        const { getByA11yLabel, queryByA11yLabel } = render(
            <SelectProvider>
                <Select multiSelection={true} options={DATA} />
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

    it('should, while multiSelection enabled, click should NOT execute opening dropdown', () => {
        const { getByA11yLabel, queryByA11yLabel } = render(
            <SelectProvider>
                <Select multiSelection={true} options={DATA} />
            </SelectProvider>,
        );

        const open = getByA11yLabel('Open a dropdown');
        fireEvent.press(open);

        const listWrapper = queryByA11yLabel('Options list');
        expect(listWrapper).toBeTruthy();

        const optionPress = getByA11yLabel(`Choose ${DATA[0].label} option`);
        fireEvent.press(optionPress);

        const optionSelected = getByA11yLabel(`${DATA[0].label} selected`);
        expect(optionSelected).toBeTruthy();

        const tryOpenAgain = getByA11yLabel('Open a dropdown');
        fireEvent.press(tryOpenAgain);

        const listWrapperShouldNotBeVisible = queryByA11yLabel('Options list');
        expect(listWrapperShouldNotBeVisible).toBeFalsy();
    });

    it('should, while multiSelection enabled, show, select and remove selected option', () => {
        const { getByA11yLabel, queryByA11yLabel } = render(
            <SelectProvider>
                <Select multiSelection={true} options={DATA} />
            </SelectProvider>,
        );

        const open = getByA11yLabel('Open a dropdown');
        fireEvent.press(open);

        const optionPress = getByA11yLabel(`Choose ${DATA[0].label} option`);
        fireEvent.press(optionPress);

        const optionSelected = getByA11yLabel(`${DATA[0].label} selected`);
        expect(optionSelected).toBeTruthy();

        const openAgain = getByA11yLabel('Arrow for opening dropdown');
        fireEvent.press(openAgain);

        const secondOptionPress = getByA11yLabel(
            `Choose ${DATA[1].label} option`,
        );
        fireEvent.press(secondOptionPress);

        const selectedSecondOption = getByA11yLabel(
            `${DATA[1].label} selected`,
        );
        expect(selectedSecondOption).toBeTruthy();

        fireEvent.press(optionSelected);

        const optionShouldNotExist = queryByA11yLabel(
            `${DATA[0].label} selected`,
        );
        expect(optionShouldNotExist).toBeFalsy();
    });
    it('should NOT open options menu after pressing Pressable in select with multi select enabled and whole select disabled', () => {
        const onOpen = jest.fn();

        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select disabled={true} multiSelection={true} options={DATA} />
            </SelectProvider>,
        );

        const open = getByA11yLabel('Open a dropdown');
        fireEvent.press(open);
        expect(onOpen).not.toHaveBeenCalled();
    });
});
describe('Select with multi selection and searchable', () => {
    it('should generate Select with multi selection and searchable enabled snapshot', () => {
        const wrapper = render(
            <SelectProvider>
                <Select
                    multiSelection={true}
                    options={SEARCHABLE_DATA}
                    searchable={true}
                />
            </SelectProvider>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should, while multiSelection and searchable enabled, click and open options', () => {
        const { getByA11yLabel } = render(
            <SelectProvider>
                <Select
                    multiSelection={true}
                    options={SEARCHABLE_DATA}
                    searchable={true}
                />
            </SelectProvider>,
        );

        const inputData = 'Second';
        const nextInputData = 'First';

        const input = getByA11yLabel('Place text');

        fireEvent.changeText(input, inputData);

        const list = getByA11yLabel('Options list');

        expect(list.props.data.length).toBe(1);

        const firstOption = getByA11yLabel(
            `Choose ${inputData} test options option`,
        );

        fireEvent.press(firstOption);

        const inputAgain = getByA11yLabel('Place text');

        expect(inputAgain.props.value).toBe('');

        fireEvent.changeText(inputAgain, nextInputData);
        expect(inputAgain.props.value).toBe(nextInputData);

        const listAgain = getByA11yLabel('Options list');

        expect(listAgain.props.data.length).toBe(1);

        const secondOption = getByA11yLabel(
            `Choose ${nextInputData} test options option`,
        );

        fireEvent.press(secondOption);

        const selectedFirstOption = getByA11yLabel(
            `${SEARCHABLE_DATA[1].label} selected`,
        );
        expect(selectedFirstOption).toBeTruthy();
        const selectedSecondOption = getByA11yLabel(
            `${SEARCHABLE_DATA[0].label} selected`,
        );
        expect(selectedSecondOption).toBeTruthy();
    });
});
