import React from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';

import { MultiSelectedOptions } from '../multi-selected-options';
import { SelectInput } from '../select-input';
import { SelectText } from '../select-text';

import { useMultiSelect } from './multi-select.hooks';
import type { MultiSelectProps } from './multi-select.types';

export const MultiSelect = <T,>({
    selectedOptions,
    separatedMultiple,
    widthThreshold,
}: MultiSelectProps<T>) => {
    const { disabled, isSearchable } = useMultiSelect<T>({
        selectedOptions,
    });

    const renderOptions = () => {
        if (!selectedOptions) {
            return isSearchable ? null : <SelectText />;
        }

        return separatedMultiple ? null : (
            <MultiSelectedOptions
                selectedOptions={selectedOptions}
                widthThreshold={widthThreshold}
            />
        );
    };

    return (
        <ScrollView scrollEnabled={!disabled} style={styles.container} horizontal>
            {isSearchable && <SelectInput />}
            {renderOptions()}
        </ScrollView>
    );
};

type Styles = {
    container: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
    },
});
