import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { PADDING } from '../../constants';
import { useSelectContext } from '../../context';
import { selectedOptionResolver } from '../../helpers';
import { MultiSelect } from '../multi-select';
import { SelectInput } from '../select-input';
import { SelectText } from '../select-text';

export const SelectFieldType = () => {
    const { multiple, searchValue, selectedOption } = useSelectContext();
    const { selectedOptionLabel, selectedOptions } = selectedOptionResolver(selectedOption);

    const renderProperSelectFieldType = () => {
        if (multiple) {
            return <MultiSelect selectedOptions={selectedOptions} />;
        }

        const isSearchable = typeof searchValue === 'string';

        if (isSearchable) {
            return <SelectInput />;
        }

        return <SelectText selectedOptionLabel={selectedOptionLabel} />;
    };

    return (
        <View style={[styles.container, multiple ? styles.multiSelect : styles.singleSelect]}>
            {renderProperSelectFieldType()}
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
