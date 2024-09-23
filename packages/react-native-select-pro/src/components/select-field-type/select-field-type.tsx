import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { MultiSelect } from '../multi-select';
import { SelectInput } from '../select-input';
import { SelectText } from '../select-text';

import { useSelectFieldType } from './select-field-type.hooks';

type Props = {
    separatedMultiple?: boolean;
    widthThreshold?: number;
};

export const SelectFieldType = ({ separatedMultiple, widthThreshold }: Props) => {
    const { multiple, selectedOptions, selectedOptionLabel, isSearchable } = useSelectFieldType();

    const renderSelectFieldType = () => {
        if (multiple) {
            return (
                <MultiSelect
                    selectedOptions={selectedOptions}
                    separatedMultiple={separatedMultiple}
                    widthThreshold={widthThreshold}
                />
            );
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
