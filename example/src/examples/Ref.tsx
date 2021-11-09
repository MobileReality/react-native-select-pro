import React, { useRef } from 'react';
import { Button, SafeAreaView } from 'react-native';
import { Select, SelectRef } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

export const Ref = () => {
    const ref = useRef<SelectRef>(null);

    const onPress = () => {
        if (ref.current) {
            ref.current.open();
        }
    };

    const onClear = () => {
        if (ref.current) {
            ref.current.clear();
        }
    };

    return (
        <SafeAreaView>
            <Select options={DATA} ref={ref} selectControlStyle={{ width: 300 }} />
            <Button onPress={onPress} title={'Open'} />
            <Button onPress={onClear} title={'Reset'} />
        </SafeAreaView>
    );
};
