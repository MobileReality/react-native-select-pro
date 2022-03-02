import React, { ComponentPropsWithRef } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, ViewStyle } from 'react-native';
import type { OptionType, Select } from '@mobile-reality/react-native-select-pro';
import type {
    OnPressSelectControlType,
    OnSetPosition,
} from '@mobile-reality/react-native-select-pro';

import type { OptionalToRequired } from '../../helpers';
import { parsePercentageToNumber } from '../../helpers/parsePercentageToNumber';
import type { State } from '../../state/types';
import type { DispatchType } from '../../state/types';
import { SelectInput } from '../select-input';

import { MultiSelectedOption } from './components/selected-option';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'selectControlTextStyle'
    | 'placeholderText'
    | 'selectControlStyle'
    | 'disabled'
    | 'searchPattern'
    | 'searchable'
    | 'multiSelection'
>;

type SelectControlProps = OptionalToRequired<
    FromSelectComponentProps & Pick<State, 'selectedOption'>
>;

type Props = {
    onPressRemove: (option: OptionType | null) => void;
    onPressSelectControl: OnPressSelectControlType;
} & SelectControlProps &
    Pick<State, 'isOpened' | 'selectedOption' | 'searchValue'> & {
        dispatch: DispatchType;
    } & { setPosition: OnSetPosition };

export const MultiSelect = ({
    searchable,
    selectControlTextStyle,
    selectControlStyle,
    selectedOption,
    placeholderText,
    onPressRemove,
    disabled,
    dispatch,
    isOpened,
    onPressSelectControl,
    searchPattern,
    searchValue,
    setPosition,
    multiSelection,
}: Props) => {
    const { width } = useWindowDimensions();
    const selectedOptionTyped = selectedOption as OptionType[];

    const resolveSelectedOptions = () => {
        if (!selectedOptionTyped) {
            if (searchable) {
                return null;
            }
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
            const WIDTH_THRESHOLD = 100;
            const WIDTH_OFFSET = 72;
            const length = selectedOptionTyped.length;
            const initialWidth = selectControlStyle ? (selectControlStyle as ViewStyle).width : 100;
            let calculatedWidth = 100;
            if (typeof initialWidth === 'number') {
                calculatedWidth = (initialWidth - WIDTH_OFFSET) / length;
                if (calculatedWidth < WIDTH_THRESHOLD) {
                    return WIDTH_THRESHOLD;
                }
                return Math.floor(calculatedWidth);
            }
            if (typeof initialWidth === 'string') {
                const ratioToScreen = Math.floor(
                    width * (parsePercentageToNumber(initialWidth) / 100),
                );
                calculatedWidth = ratioToScreen / length;
                if (calculatedWidth - WIDTH_OFFSET < WIDTH_THRESHOLD) {
                    return WIDTH_THRESHOLD;
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
            {searchable && (
                <SelectInput
                    disabled={disabled}
                    dispatch={dispatch}
                    isOpened={isOpened}
                    multiSelection={multiSelection}
                    onPressSelectControl={onPressSelectControl}
                    placeholderText={placeholderText}
                    searchPattern={searchPattern}
                    searchValue={searchValue}
                    selectedOption={selectedOption}
                    setPosition={setPosition}
                />
            )}
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
