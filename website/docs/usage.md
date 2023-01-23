---
id: usage
title: Usage
sidebar_label: Usage
---

### Required `SelectProvider`

Firstly, wrap your app code in a `SelectProvider` component:

```jsx
import React from 'react';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';

const AppRoot = () => {
    return <SelectProvider>{/* rest of your app code */}</SelectProvider>;
};
```

Then you can use `Select` component:

### Basic

```SnackPlayer name=Basic&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import { View, StyleSheet } from 'react-native';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

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

const MyView = () => {
    return (
        <View style={styles.container}>
            <Select options={data} />
        </View>
    );
};

const App = () => {
    return (
        <SelectProvider>
            <MyView />
        </SelectProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
```

### Sections

Additionally you can pass second available data structure:

```SnackPlayer name=Sections&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import { View, StyleSheet } from 'react-native';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

const data = [
    {
        title: 'North America',
        data: [
            {
                value: 'us',
                label: 'United States of America',
            },
            {
                value: 'ca',
                label: 'Canada',
            },
        ],
    },
    {
        title: 'Europe',
        data: [
            {
                value: 'pl',
                label: 'Poland',
            },
            {
                value: 'es',
                label: 'Spain',
            },
            {
                value: 'fr',
                label: 'France',
            },
        ],
    },
];

const MyView = () => {
    return (
        <View style={styles.container}>
            <Select options={data} />
        </View>
    );
};

const App = () => {
    return (
        <SelectProvider>
            <MyView />
        </SelectProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
```

### Multiple

Use `multiple` prop to allow multiple `Select`:

```SnackPlayer name=Multiple&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import { View, StyleSheet } from 'react-native';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

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

const MyView = () => {
    return (
        <View style={styles.container}>
            <Select options={data} multiple={true} />
        </View>
    );
};

const App = () => {
    return (
        <SelectProvider>
            <MyView />
        </SelectProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
```

### Searchable

Use `searchble` prop to allow search in `Select`:

```SnackPlayer name=Searchable&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import { View, StyleSheet } from 'react-native';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

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

const MyView = () => {
    return (
        <View style={styles.container}>
            <Select options={data} searchable={true} />
        </View>
    );
};

const App = () => {
    return (
        <SelectProvider>
            <MyView />
        </SelectProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
```

### `Select` inside `Modal`

If you want to use `Select` component inside:

-   `Modal` from `react-native` / `react-native-modal`
-   `BottomSheet` from `react-native-bottom-sheet`

you need to wrap code inside `Modal` / `BottomSheet` in `SelectModalProvider`:

```SnackPlayer name=SelectModal&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import { useState } from 'react';
import { View, StyleSheet, Modal, Button } from 'react-native';
import {
    Select,
    SelectProvider,
    SelectModalProvider,
} from '@mobile-reality/react-native-select-pro';

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

const MyView = () => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Button title="Open Modal" onPress={() => setVisible(true)} />
            <Modal visible={visible}>
                <SafeAreaProvider>
                    <SelectModalProvider>
                        <View style={styles.container}>
                            <Button title="Close Modal" onPress={() => setVisible(false)} />
                            <Select options={data} />
                        </View>
                    </SelectModalProvider>
                </SafeAreaProvider>
            </Modal>
        </View>
    );
};

const App = () => {
    return (
        <SelectProvider>
            <MyView />
        </SelectProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
```
