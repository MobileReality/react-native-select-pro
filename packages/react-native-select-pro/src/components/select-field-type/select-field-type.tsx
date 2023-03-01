import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { MultiSelect } from '../multi-select';
import { SelectInput } from '../select-input';
import { SelectText } from '../select-text';

import { useSelectFieldType } from './select-field-type.hooks';

export const SelectFieldType = () => {
    const { multiple, selectedOptions, selectedOptionLabel, isSearchable } = useSelectFieldType();

    const renderSelectFieldType = () => {
        if (multiple) {
            return <MultiSelect selectedOptions={selectedOptions} />;
        }

        if (isSearchable) {
            return <SelectInput />;
        }

        return <SelectText selectedOptionLabel={selectedOptionLabel} />;
    };

    return <View style={styles.container}>{renderSelectFieldType()}</View>;
};

type Styles = {
    container: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
    },
});
