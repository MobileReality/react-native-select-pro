import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { Text } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';

import { FONT_SIZE } from '../../constants';
import { useSelectContext } from '../../context';
import type { OptionType } from '../../index';
import { MultiSelectedOption } from '../multi-selected-option';
import { SelectInput } from '../select-input';

import { useMultiSelect } from './multi-select.hooks';
import type { MultiSelectProps } from './multi-select.types';

export const MultiSelect = ({ selectedOptions, onPressRemove, selectStyles }: MultiSelectProps) => {
    const { searchValue, placeholderText, placeholderTextColor } = useSelectContext();
    const containerWidth = (selectStyles as ViewStyle)?.width;
    const { calculatedOptionWidth } = useMultiSelect({ selectedOptions, containerWidth });
    const isSearchable = typeof searchValue === 'string';

    const resolveContent = () => {
        const searchInput = (
            <SelectInput selectedOption={selectedOptions} textStyle={selectStyles?.text} />
        );

        const placeholder = (
            <Text
                numberOfLines={1}
                style={[
                    styles.placeholder,
                    selectStyles?.text,
                    {
                        color: placeholderTextColor,
                    },
                ]}
            >
                {placeholderText}
            </Text>
        );

        const resolveSelectedOptionsList = () => {
            if (!selectedOptions) {
                return isSearchable ? null : placeholder;
            }

            return selectedOptions.map((option: OptionType, index) => (
                <MultiSelectedOption
                    key={index}
                    optionWidth={calculatedOptionWidth}
                    {...{
                        option,
                        selectStyles,
                        onPressRemove,
                    }}
                />
            ));
        };

        return (
            <>
                {isSearchable && searchInput}
                {resolveSelectedOptionsList()}
            </>
        );
    };

    return (
        <ScrollView horizontal={true} style={styles.multiSelectionWrapper}>
            {resolveContent()}
        </ScrollView>
    );
};

type Styles = {
    multiSelectionWrapper: ViewStyle;
    placeholder: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    multiSelectionWrapper: {
        flex: 1,
    },
    placeholder: {
        fontSize: FONT_SIZE,
        textAlign: 'left',
        alignSelf: 'center',
    },
});
