import React, { ComponentPropsWithRef } from 'react';
import {
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    ViewStyle,
} from 'react-native';

import { parsePercentageToNumber } from '../../helpers';
import type { OptionalToRequired } from '../../helpers/types/OptionalToRequired';
import type {
    OnPressSelectControlType,
    OnSetPosition,
    OptionType,
    Select,
} from '../../index';
import type { DispatchType, State } from '../../state/types';
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
    | 'multiSelectionOptionStyle'
    | 'placeholderTextColor'
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
    placeholderTextColor,
    onPressRemove,
    disabled,
    dispatch,
    isOpened,
    onPressSelectControl,
    searchPattern,
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
                    selectControlTextStyle={selectControlTextStyle}
                />
            );
        }

        const optionWidth = () => {
            const WIDTH_THRESHOLD = 100;
            const WIDTH_OFFSET = 72;
            const { length } = selectedOptionTyped;
            const initialWidth = selectControlStyle
                ? (selectControlStyle as ViewStyle).width
                : 100;
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
                    selectControlTextStyle={selectControlTextStyle}
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
                    searchValue={searchValue}
                    selectControlTextStyle={selectControlTextStyle}
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
