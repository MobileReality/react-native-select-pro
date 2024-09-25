import React from 'react';
import type { StyleProp } from 'react-native';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { MultiSelectedOptions } from '../multi-selected-options';
import { useSelectFieldType } from '../select-field-type/select-field-type.hooks';

type Props = {
    containerStyles?: StyleProp<ViewStyle>;
    widthThreshold?: number;
};

export const MultiSelectedSeparatedOptions = ({ containerStyles, widthThreshold }: Props) => {
    const { selectedOptions } = useSelectFieldType();

    return (
        <View style={[styles.multiSelectedOptions, containerStyles]}>
            <MultiSelectedOptions
                selectedOptions={selectedOptions}
                widthThreshold={widthThreshold}
            />
        </View>
    );
};

type Styles = {
    multiSelectedOptions: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
    multiSelectedOptions: {
        flexWrap: 'wrap',
        width: '100%',
        flexDirection: 'row',
    },
});
