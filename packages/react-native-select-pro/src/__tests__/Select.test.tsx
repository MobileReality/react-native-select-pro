import React from 'react';
import { MeasureOnSuccessCallback, Pressable, Text, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { Select } from '../components/select';
import { SelectProvider } from '../components/select-provider';
import type { OptionComponentProps } from '../index';

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

jest.spyOn(View.prototype, 'measure').mockImplementation(
    (fn: MeasureOnSuccessCallback): void => {
        fn(0, 0, 45, 20, 0, 0);
    },
);

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

        const optionPress = getByLabelText(`Choose ${DATA[0].label} option`);
        fireEvent.press(optionPress);

        const clearButton = getByLabelText('Clear a chosen option');
        expect(clearButton).toBeTruthy();
    });

    it('should close dropdown menu after pressed outside dropdown', () => {
        const { getByLabelText, queryByLabelText } = render(
            <SelectProvider>
                <Select options={DATA} />
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
        const { getByLabelText } = render(
            <SelectProvider>
                <Select
                    OptionComponent={(props) => <MyCustomOption {...props} />}
                    options={[DATA[0]]}
                />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const list = getByLabelText('Options list');
        expect(list).toBeTruthy();

        const option = getByLabelText('Option');
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
                    onDropdownOpened={onOpen}
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
                <Select
                    disabled={true}
                    options={SEARCHABLE_DATA}
                    searchable={true}
                />
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

        const firstInputData = 'Second test options';
        const secondInputData = 'Third test option';
        const thirdInputData = 'options';

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
                <Select
                    options={SEARCHABLE_DATA}
                    searchPattern={searchPattern}
                    searchable={true}
                />
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

        const selectOptionInputData = 'Second test options';

        const input = getByLabelText('Place text');

        fireEvent.changeText(input, inputData);

        const list = getByLabelText('Options list');

        expect(list.props.data.length).toBe(1);

        const option = getByLabelText(
            `Choose ${inputData} test options option`,
        );

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
        const { getByLabelText, queryByLabelText } = render(
            <SelectProvider>
                <Select multiSelection={true} options={DATA} />
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

    it('should, while multiSelection enabled, click should NOT execute opening dropdown', () => {
        const { getByLabelText, queryByLabelText } = render(
            <SelectProvider>
                <Select multiSelection={true} options={DATA} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const listWrapper = queryByLabelText('Options list');
        expect(listWrapper).toBeTruthy();

        const optionPress = getByLabelText(`Choose ${DATA[0].label} option`);
        fireEvent.press(optionPress);

        const optionSelected = getByLabelText(`${DATA[0].label} selected`);
        expect(optionSelected).toBeTruthy();

        const tryOpenAgain = getByLabelText('Open a dropdown');
        fireEvent.press(tryOpenAgain);

        const listWrapperShouldNotBeVisible = queryByLabelText('Options list');
        expect(listWrapperShouldNotBeVisible).toBeFalsy();
    });

    it('should, while multiSelection enabled, show, select and remove selected option', () => {
        const { getByLabelText, queryByLabelText } = render(
            <SelectProvider>
                <Select multiSelection={true} options={DATA} />
            </SelectProvider>,
        );

        const open = getByLabelText('Open a dropdown');
        fireEvent.press(open);

        const optionPress = getByLabelText(`Choose ${DATA[0].label} option`);
        fireEvent.press(optionPress);

        const optionSelected = getByLabelText(`${DATA[0].label} selected`);
        expect(optionSelected).toBeTruthy();

        const openAgain = getByLabelText('Arrow for opening dropdown');
        fireEvent.press(openAgain);

        const secondOptionPress = getByLabelText(
            `Choose ${DATA[1].label} option`,
        );
        fireEvent.press(secondOptionPress);

        const selectedSecondOption = getByLabelText(
            `${DATA[1].label} selected`,
        );
        expect(selectedSecondOption).toBeTruthy();

        fireEvent.press(optionSelected);

        const optionShouldNotExist = queryByLabelText(
            `${DATA[0].label} selected`,
        );
        expect(optionShouldNotExist).toBeFalsy();
    });
    it('should NOT open options menu after pressing Pressable in select with multi select enabled and whole select disabled', () => {
        const onOpen = jest.fn();

        const { getByLabelText } = render(
            <SelectProvider>
                <Select disabled={true} multiSelection={true} options={DATA} />
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
        const { getByLabelText, getByPlaceholderText } = render(
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

        const input = getByLabelText('Place text');

        fireEvent.changeText(input, inputData);

        const list = getByLabelText('Options list');

        expect(list.props.data.length).toBe(1);

        const firstOption = getByLabelText(
            `Choose ${inputData} test options option`,
        );

        fireEvent.press(firstOption);

        const inputAgain = getByLabelText('Place text');

        expect(inputAgain.props.value).toBe('');

        fireEvent.changeText(inputAgain, nextInputData);
        expect(inputAgain.props.value).toBe(nextInputData);

        const listAgain = getByLabelText('Options list');

        expect(listAgain.props.data.length).toBe(1);

        const secondOption = getByLabelText(
            `Choose ${nextInputData} test options option`,
        );

        fireEvent.press(secondOption);

        const selectedFirstOption = getByLabelText(
            `${SEARCHABLE_DATA[1].label} selected`,
        );
        expect(selectedFirstOption).toBeTruthy();
        const selectedSecondOption = getByLabelText(
            `${SEARCHABLE_DATA[0].label} selected`,
        );
        expect(selectedSecondOption).toBeTruthy();

        const currentPlaceholderText = getByPlaceholderText('');
        expect(currentPlaceholderText).toBeTruthy();
    });
});
