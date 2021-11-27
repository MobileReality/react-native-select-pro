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
        const MyCustomOption = ({ onPressOption, option }: OptionComponentProps) => {
            return (
                <Pressable accessibilityLabel={'Option'} onPress={onPressOption}>
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
