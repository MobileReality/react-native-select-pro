import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Test } from 'react-native-select-pro';
// import { Test } from '../../lib/module';

export default function App() {
    return (
        <View style={styles.container}>
            <Test title={'Title'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
