import React from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';

import { useSelectContext } from '../../context';
import type { OptionType } from '../../index';
import { MultiSelectedOption } from '../multi-selected-option';
import { SelectInput } from '../select-input';

import { useMultiSelect } from './multi-select.hooks';
import type { MultiSelectProps } from './multi-select.types';

export const MultiSelect = ({
    textStyle,
    containerStyle,
    selectedOptions,
    onPressRemove,
    multiSelectionOptionStyle,
}: MultiSelectProps) => {
    const { searchValue } = useSelectContext();
    const containerWidth = (containerStyle as ViewStyle)?.width;
    const { calculatedOptionWidth } = useMultiSelect({ selectedOptions, containerWidth });
    const isSearchable = typeof searchValue === 'string';

    const resolveContent = () => {
        const searchInput = (
            <SelectInput
                selectedOption={selectedOptions}
                {...{
                    textStyle,
                }}
            />
        );

        const emptyList = (
            <MultiSelectedOption
                isPlaceholder={true}
                option={null}
                optionWidth="100%"
                {...{
                    textStyle,
                    multiSelectionOptionStyle,
                }}
            />
        );

        const resolveSelectedOptionsList = () => {
            if (!selectedOptions) {
                return isSearchable ? null : emptyList;
            }

            return selectedOptions.map((option: OptionType, index) => (
                <MultiSelectedOption
                    key={index}
                    optionWidth={calculatedOptionWidth}
                    {...{
                        option,
                        textStyle,
                        multiSelectionOptionStyle,
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
};

const styles = StyleSheet.create<Styles>({
    multiSelectionWrapper: {
        flex: 1,
    },
});
