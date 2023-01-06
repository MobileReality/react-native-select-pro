import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { PADDING } from '../../constants';
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

    return (
        <View style={[styles.container, multiple ? styles.multiSelect : styles.singleSelect]}>
            {renderSelectFieldType()}
        </View>
    );
};

type Styles = {
    container: ViewStyle;
    multiSelect: ViewStyle;
    singleSelect: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        height: '100%',
        paddingHorizontal: PADDING,
        justifyContent: 'center',
    },
    multiSelect: {
        paddingRight: 40,
    },
    singleSelect: {
        paddingRight: 55,
    },
});
