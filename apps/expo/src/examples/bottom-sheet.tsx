import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Select } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const SelectBottomSheet = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%'], []);

    return (
        <SafeAreaViewWrapper>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose
            >
                <View style={styles.container}>
                    <Select options={DATA} />
                </View>
            </BottomSheet>
        </SafeAreaViewWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
});
