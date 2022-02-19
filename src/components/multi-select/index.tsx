import React, { ComponentPropsWithRef } from 'react';
import { Dimensions, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import type { OptionType, Select } from '@mobile-reality/react-native-select-pro';

import type { OptionalToRequired } from '../../helpers';
import { parsePercentageToNumber } from '../../helpers/parsePercentageToNumber';
import type { State } from '../../state/types';

import { MultiSelectedOption } from './components/selected-option';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    'selectControlTextStyle' | 'placeholderText' | 'selectControlStyle'
>;

type SelectControlProps = OptionalToRequired<
    FromSelectComponentProps & Pick<State, 'selectedOption'>
>;

type Props = {
    onPressRemove: (option: OptionType | null) => void;
} & SelectControlProps &
    FromSelectComponentProps;

export const MultiSelect = ({
    selectControlTextStyle,
    selectControlStyle,
    selectedOption,
    placeholderText,
    onPressRemove,
}: Props) => {
    const selectedOptionTyped = selectedOption as OptionType[];

    const resolveSelectedOptions = () => {
        if (!selectedOptionTyped) {
            return (
                <MultiSelectedOption
                    isPlaceholder={true}
                    option={null}
                    optionWidth={'100%'}
                    placeholderText={placeholderText}
                    selectControlTextStyle={selectControlTextStyle}
                />
            );
        }

        const optionWidth = () => {
            const WIDTH_TRESSHOLD = 100;
            const WIDTH_OFFSET = 72;
            const length = selectedOptionTyped.length;
            const initialWidth = (selectControlStyle as ViewStyle).width;
            let calculatedWidth = 100;
            if (typeof initialWidth === 'number') {
                calculatedWidth = (initialWidth - WIDTH_OFFSET) / length;
                if (calculatedWidth < WIDTH_TRESSHOLD) {
                    return WIDTH_TRESSHOLD;
                }
                return Math.floor(calculatedWidth);
            }
            if (typeof initialWidth === 'string') {
                const screenWidth = Dimensions.get('window').width;
                const ratioToScreen = Math.floor(
                    screenWidth * (parsePercentageToNumber(initialWidth) / 100),
                );
                calculatedWidth = ratioToScreen / length;
                if (calculatedWidth - WIDTH_OFFSET < WIDTH_TRESSHOLD) {
                    return WIDTH_TRESSHOLD;
                }
                return calculatedWidth - WIDTH_OFFSET;
            }
            return 0;
        };

        return selectedOptionTyped.map((option: OptionType, index) => {
            return (
                <MultiSelectedOption
                    key={index}
                    onPressRemove={onPressRemove}
                    option={option}
                    optionWidth={optionWidth()}
                    placeholderText={placeholderText}
                    selectControlTextStyle={selectControlTextStyle}
                />
            );
        });
    };

    return (
        <ScrollView horizontal={true} style={styles.multiSelectionWrapper}>
            {resolveSelectedOptions()}
        </ScrollView>
    );
};

type Styles = {
    multiSelectionWrapper: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    multiSelectionWrapper: {
        flex: 1,
    },
});
