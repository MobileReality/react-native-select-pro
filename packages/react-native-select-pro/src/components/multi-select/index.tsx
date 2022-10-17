import type { ComponentPropsWithRef } from 'react';
import React from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import type { OptionalToRequired } from '../../helpers';
import { parsePercentageToNumber } from '../../helpers';
import type { OnPressSelectControlType, OnSetPosition, OptionType, Select } from '../../index';
import type { DispatchType, State } from '../../state/types';
import type { SelectControlStyles } from '../../types/styles';
import { SelectInput } from '../select-input';

import { MultiSelectedOption } from './components/selected-option';

type FromSelectComponentProps = Pick<
    ComponentPropsWithRef<typeof Select>,
    | 'placeholderText'
    | 'disabled'
    | 'searchPattern'
    | 'textInputProps'
    | 'searchable'
    | 'multiSelection'
    | 'placeholderTextColor'
> &
    Pick<SelectControlStyles, 'multiSelectionOptionStyle' | 'textStyle' | 'containerStyle'>;

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
    textStyle,
    containerStyle,
    selectedOption,
    placeholderText,
    placeholderTextColor,
    onPressRemove,
    disabled,
    dispatch,
    isOpened,
    onPressSelectControl,
    searchPattern,
    textInputProps,
    searchValue,
    setPosition,
    multiSelection,
    multiSelectionOptionStyle,
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
                    optionWidth="100%"
                    placeholderText={placeholderText}
                    placeholderTextColor={placeholderTextColor}
                    textStyle={textStyle}
                />
            );
        }

        const optionWidth = () => {
            const WIDTH_THRESHOLD = 100;
            const WIDTH_OFFSET = 72;
            const { length } = selectedOptionTyped;
            const initialWidth = containerStyle ? (containerStyle as ViewStyle).width : 100;
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
                    option={option}
                    optionWidth={optionWidth()}
                    placeholderText={placeholderText}
                    textStyle={textStyle}
                    multiSelectionOptionStyle={multiSelectionOptionStyle}
                    onPressRemove={onPressRemove}
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
                    placeholderText={placeholderText}
                    placeholderTextColor={placeholderTextColor}
                    searchPattern={searchPattern}
                    textInputProps={textInputProps}
                    searchValue={searchValue}
                    textStyle={textStyle}
                    selectedOption={selectedOption}
                    setPosition={setPosition}
                    onPressSelectControl={onPressSelectControl}
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
