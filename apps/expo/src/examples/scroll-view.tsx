import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

const data = [
    {
        label: 'Option 1',
        value: 'option1',
    },
    {
        label: 'Option 2',
        value: 'option2',
    },
    {
        label: 'Option 3',
        value: 'option3',
    },
    {
        label: 'Option 4',
        value: 'option4',
    },
];

export const ScrollViewExample = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>
                    When using ScrollView together with Select, there are two key things to keep in
                    mind.
                </Text>

                <Text style={styles.paragraph}>
                    First, the SelectProvider must be placed above the ScrollView in the component
                    hierarchy.
                </Text>

                <Text style={styles.paragraph}>
                    In our case, the SelectProvider is located in the parent component, App.
                </Text>

                <Text style={styles.paragraph}>
                    Second, it is important to ensure that SelectProvider is not duplicated across
                    different parts of the application.
                </Text>

                <Text style={styles.paragraph}>
                    This can cause issues with calculating the position of the dropdown menu.
                </Text>
                <Select options={data} />
                <Text style={styles.paragraph}>Scroll View Example</Text>
                <Text style={styles.paragraph}>Scroll View Example</Text>
                <Text style={styles.paragraph}>Scroll View Example</Text>
                <Select options={data} />
                <Text style={styles.paragraph}>Scroll View Example</Text>
                <Text style={styles.paragraph}>Scroll View Example</Text>
                <Text style={styles.paragraph}>Scroll View Example</Text>
                <Select options={data} />
                <Text style={styles.paragraph}>Scroll View Example</Text>
                <Text style={styles.paragraph}>Scroll View Example</Text>
                <Text style={styles.paragraph}>Scroll View Example</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    paragraph: {
        margin: 24,
        textAlign: 'center',
    },
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 25,
    },
});
