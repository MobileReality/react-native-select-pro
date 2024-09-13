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

### Animated

```SnackPlayer name=Animated&dependencies=@mobile-reality/react-native-select-pro@2.0.0
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
            <Select options={data} animation={500} />
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

### Bottom sheet

```SnackPlayer name=Bottom sheet&dependencies=@mobile-reality/react-native-select-pro@2.0.0,@gorhom/bottom-sheet@4.6.4,@types/react@18.0.38,@types/react-native@0.66.8,react-native-reanimated@~3.10.1,react-native-gesture-handler@~2.16.1
import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
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

const App = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%'], []);

    return (
        <SelectProvider>
            <View style={styles.container}>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    enablePanDownToClose
                >
                    <View style={styles.wrapper}>
                        <Select options={data} />
                    </View>
                </BottomSheet>
            </View>
        </SelectProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
});

export default App;
```

### Callbacks

```SnackPlayer name=Callbacks&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import type { OptionType } from '@mobile-reality/react-native-select-pro';
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

const App = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [selected, setSelected] = useState<OptionType | null>(null);

    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

    const [removed, setRemoved] = useState<OptionType | OptionType[] | null>(null);
    const [removedIndex, setRemovedIndex] = useState<number | number[]>(-1);

    return (
        <SelectProvider>
            <View style={styles.container}>
                <Text style={{ marginBottom: 20 }}>isOpened: {isOpened.toString()}</Text>
                {selected && (
                    <>
                        <Text style={{ marginBottom: 20 }}>
                            Selected item: {JSON.stringify(selected, null, 4)}
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            Selected index: {selectedItemIndex}
                        </Text>
                    </>
                )}
                {removed && (
                    <>
                        <Text style={{ marginBottom: 20 }}>
                            Removed item: {JSON.stringify(removed, null, 4)}
                        </Text>
                        <Text style={{ marginBottom: 20 }}>
                            Removed index: {removedIndex}
                        </Text>
                    </>
                )}
                <Select
                    options={data}
                    styles={{ select: { container: { width: 250 } } }}
                    onSelectClosed={() => {
                        setIsOpened(false);
                    }}
                    onSelectOpened={() => {
                        setIsOpened(true);
                    }}
                    onSelect={(option, optionIndex) => {
                        setSelected(option);
                        setSelectedItemIndex(optionIndex);
                    }}
                    onRemove={(option, optionIndex) => {
                        setRemoved(option);
                        setRemovedIndex(optionIndex);
                        setSelected(null);
                        setSelectedItemIndex(-1);
                    }}
                />
            </View>
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

### Custom icons

```SnackPlayer name=Custom icons&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

const searchImage = require('../assets/search.png');
const globeImage = require('../assets/globe.png');
const chevronsImage = require('../assets/chevrons-down.png');
const arrowImage = require('../assets/arrow-down.png');

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

const App = () => {
    return (
        <SelectProvider>
            <View style={styles.container}>
                <Text style={{ marginBottom: 20 }}>Custom left icon</Text>
                <Select
                    styles={{
                        select: {
                            container: { marginBottom: 20 },
                            leftIcon: {
                                height: 20,
                                width: 20,
                            },
                        },
                    }}
                    options={data}
                    selectLeftIconImageProps={{ source: globeImage }}
                />
                <Select
                    styles={{
                        select: {
                            container: {
                                marginBottom: 20,
                            },
                            leftIcon: {
                                height: 25,
                                width: 25,
                            },
                        },
                    }}
                    options={data}
                    placeholderText="Search..."
                    searchable={true}
                    selectLeftIconImageProps={{ source: searchImage }}
                />
                <Text style={{ marginBottom: 20 }}>Custom select control arrow</Text>
                <Select
                    styles={{
                        select: {
                            container: { marginBottom: 20 },
                            arrow: {
                                icon: { height: 25, width: 25 },
                            },
                        },
                    }}
                    options={data}
                    arrowImageProps={{ source: chevronsImage }}
                />
                <Select
                    styles={{
                        select: {
                            container: {
                                marginBottom: 20,
                            },
                            arrow: {
                                icon: { height: 25, width: 25 },
                            },
                        },
                    }}
                    options={data}
                    arrowImageProps={{ source: arrowImage }}
                />
            </View>
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

### Custom options data
-   Only `value` and `label` is required besides these fields you can add additional fields:

```SnackPlayer name=Custom options data&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { OptionType } from '@mobile-reality/react-native-select-pro';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

export const data = [
    {
        value: '96d27ec5-e196-4577-b18d-31c74ca9145c',
        label: 'First label',
        createdAt: '2022-03-23T08:22:16.108Z',
        isValid: false,
        number: 1,
        optional: 'some text for 1',
        user: {
            name: 'Tom',
            age: 20,
            phone: '123-123-123',
        },
    },
    {
        value: '2805f95f-f712-4dc2-ae25-0910f95152b6',
        label: 'Second label in options list.',
        createdAt: '2022-03-23T08:22:18.128Z',
        isValid: true,
        number: 2,
        user: {
            name: 'Sam',
            age: 30,
            phone: null,
        },
    },
    {
        value: '84bc47cd-c8ab-4673-b428-3d96876f0a3f',
        label: 'THIRD LABEL',
        createdAt: '2022-03-24T12:12:55.248Z',
        isValid: true,
        number: 3,
        user: {
            name: 'Julia',
            age: 25,
            phone: null,
        },
    },
    {
        value: 'aee6e7cd-6f36-4e69-acae-0dbfdaa428e4',
        label: '----Fourth label----',
        createdAt: '2022-03-25T12:12:55.248Z',
        isValid: false,
        number: 4,
        optional: 'some text for 4',
        user: {
            name: 'Michael',
            age: 31,
            phone: '321-321-321',
        },
    },
    {
        value: '170dcd29-0fd5-4f8b-ac76-7d52cdeca89c',
        label: '🐈🐈🐈 Fifth label',
        createdAt: '2022-03-26T12:12:55.248Z',
        isValid: true,
        number: 5,
        user: {
            name: 'Angelina',
            age: 55,
            phone: '123-123-123',
        },
    },
    {
        value: '0b8e1c91-e6d5-487e-bac5-8e1193d2e6f7',
        label: 'Last',
        createdAt: '2022-03-27T12:12:55.248Z',
        isValid: false,
        number: 6,
        user: {
            name: 'Sandra',
            age: 40,
            phone: null,
        },
    },
];

type AdditionalFields = {
    createdAt: string;
    isValid: boolean;
    number: number;
    optional?: string;
    user: {
        name: string;
        age: number;
        phone: string | null;
    };
};

type Fields = OptionType<AdditionalFields>;

export const App = () => {
    const [selected, setSelected] = useState<Fields | null>(null);

    return (
        <SelectProvider>
            <View style={styles.container}>
                <Select
                    options={data}
                    onSelect={(option) => {
                        setSelected(option);
                    }}
                />
                <View>
                    {selected && (
                      <Text>
                          Selected item: {JSON.stringify(selected, null, 4)}
                      </Text>
                    )}
                </View>
            </View>
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

### Custom styles

```SnackPlayer name=Custom styles&dependencies=@mobile-reality/react-native-select-pro@2.0.0
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

const App = () => {
    return (
        <SelectProvider>
             <View style={styles.container}>
                  <Select
                      styles={{
                          select: {
                              container: {
                                  width: 250,
                                  backgroundColor: 'lightblue',
                                  height: 80,
                              },
                              text: {
                                  fontSize: 20,
                                  color: 'white',
                              },
                              arrow: {
                                  icon: { tintColor: 'pink' },
                              },
                          },
                          optionsList: {
                              maxHeight: 150,
                          },
                          option: {
                              container: {
                                  backgroundColor: 'lightcoral',
                                  borderBottomWidth: 1,
                                  height: 40,
                              },
                              text: {
                                  fontSize: 20,
                              },
                              selected: {
                                  container: {
                                      backgroundColor: 'mediumseagreen',
                                  },
                                  text: { color: 'white' },
                              },
                              pressed: {
                                  backgroundColor: 'lightblue',
                              },
                          },
                          backdrop: { backgroundColor: 'black', opacity: 0.3 },
                      }}
                      options={data}
                      placeholderTextColor="blue"
                  />
            </View>
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

### Select inside Modal

If you want to use `Select` component inside:

-   `Modal` from `react-native` / `react-native-modal`
-   `BottomSheet` from `react-native-bottom-sheet`

you need to wrap code inside `Modal` / `BottomSheet` in `SelectModalProvider`:

```SnackPlayer name=SelectModal&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import { useState } from 'react';
import { View, StyleSheet, Modal, Button, SafeAreaView } from 'react-native';
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
                <SelectModalProvider>
                    <View style={styles.container}>
                        <Button title="Close Modal" onPress={() => setVisible(false)} />
                        <Select options={data} />
                    </View>
                </SelectModalProvider>
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

### Multiple with searchable

```SnackPlayer name=Multiple with searchable&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import React from 'react';
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

const App = () => {
    return (
        <SelectProvider>
            <View style={styles.container}>
                <Select multiple={true} options={data} searchable={true} />
            </View>
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

### No backdrop

```SnackPlayer name=No backdrop&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import { View, StyleSheet, Text } from 'react-native';
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

const App = () => {
    return (
        <SelectProvider>
            <View style={styles.container}>
                <Text>Select number 1</Text>
                <Select options={data} />
                <Text>Select number 2</Text>
                <Select options={data} />
                <Text>Select number 3 with no Backdrop</Text>
                <Select options={data} hasBackdrop={false} />
            </View>
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

### Overflow

```SnackPlayer name=Overflow&dependencies=@mobile-reality/react-native-select-pro@2.0.0
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

const App = () => {
    return (
        <SelectProvider>
            <View style={styles.container}>
                <Select options={data} />
            </View>
        </SelectProvider>
    );
};

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'flex-end',
       padding: 40,
    },
});

export default App;
```

### Real example

```SnackPlayer name=Real example&dependencies=@mobile-reality/react-native-select-pro@2.0.0,react-hook-form@7.43.0
import React from 'react';
import { useController, useForm } from 'react-hook-form';
import type { TextStyle, ViewStyle } from 'react-native';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { OptionType } from '@mobile-reality/react-native-select-pro';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

export const PROGRAMMING_LANGUAGES = [
    {
        value: 'javascript',
        label: 'JavaScript',
    },
    {
        value: 'typescript',
        label: 'TypeScript',
    },
    {
        value: 'java',
        label: 'Java',
    },
    {
        value: 'python',
        label: 'Python',
    },
    {
        value: 'c#',
        label: 'C#',
    },
    {
        value: 'c',
        label: 'C',
    },
    {
        value: 'c++',
        label: 'C++',
    },
];

export const SELECT_STYLES = {
    select: {
        multiSelectedOption: {
            container: {
                marginRight: 5,
                marginVertical: 5,
                paddingHorizontal: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#19222f',
            },
            text: {
                fontSize: 14,
                color: '#04e590',
            },
        },
        container: {
            borderRadius: 5,
            backgroundColor: '#000a19',
            borderColor: '#f34c54',
            borderWidth: 1,
        },
        text: {
            fontSize: 14,
            color: '#f34c54',
        },
        arrow: {
            icon: {
                tintColor: '#04e590',
            },
        },
    },
    optionsList: {
        borderWidth: 1,
        borderColor: '#464e58',
        backgroundColor: '#000a19',
    },
    option: {
        container: {
            backgroundColor: 'transparent',
            borderBottomColor: '#464e58',
            borderBottomWidth: 1,
        },

        text: {
            fontSize: 14,
            color: '#04e590',
        },
        selected: {
            container: {
                backgroundColor: 'transparent',
            },
            text: {
                color: '#015b39',
            },
        },
    },
};

const App = () => {
    const { control, handleSubmit, formState, watch, reset } = useForm<{ languages: OptionType[] }>(
        {
            defaultValues: {
                languages: [],
            },
        },
    );

    const { field } = useController({ name: 'languages', control });
    const { languages } = watch();

    const onSubmit = () => {
        Alert.alert('Your choices has been saved!');
    };

    return (
        <SelectProvider>
            <View style={styles.container}>
                {formState.isSubmitted ? (
                    <View style={styles.fullWidth}>
                        <Text style={styles.label}>Your programming languages are:</Text>
                        {languages.length > 0 &&
                            languages.map((language, index) => (
                                <Text key={index} style={styles.languageLabel}>
                                    {language.label}
                                </Text>
                            ))}
                    </View>
                ) : (
                    <View style={styles.fullWidth}>
                        <Text style={styles.label}>
                            Select your programming languages
                        </Text>
                        <Select
                            styles={SELECT_STYLES}
                            options={PROGRAMMING_LANGUAGES}
                            placeholderTextColor="#f34c54"
                            multiple
                            onSelect={(option) => {
                                field.onChange([...field.value, option]);
                            }}
                            onRemove={(option) => {
                                field.onChange(
                                    field.value.filter(
                                        (item) => item.value !== (option as OptionType).value,
                                    ),
                                );
                            }}
                        />
                    </View>
                )}
                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            backgroundColor: languages.length === 0 ? '#19222f' : '#f34c54',
                        },
                    ]}
                    disabled={languages.length === 0}
                    onPress={() => (formState.isSubmitted ? reset() : handleSubmit(onSubmit)())}
                >
                    <Text style={styles.buttonText}>{formState.isSubmitted ? 'EDIT' : 'SAVE'}</Text>
                </TouchableOpacity>
            </View>
        </SelectProvider>
    );
};

type Styles = {
    container: ViewStyle;
    fullWidth: ViewStyle;
    label: TextStyle;
    languageLabel: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
    container: {
        backgroundColor: '#000a19',
        paddingTop: 200,
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
    },
    fullWidth: {
        width: '100%',
    },
    languageLabel: {
        fontSize: 16,
        color: '#04e590',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#f34c54',
        marginBottom: 10,
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default App;
```

### Ref

```SnackPlayer name=Ref&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import React, { useRef, useState } from 'react';
import { Button, ScrollView, Text, View, StyleSheet } from 'react-native';
import type { SelectRef } from '@mobile-reality/react-native-select-pro';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';
import type { State } from 'packages/react-native-select-pro/src/state/types';

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

const App = () => {
    const [currentState, setCurrentState] = useState<State>();
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

    const onGetState = () => {
        if (ref.current) {
            setCurrentState(ref.current.getState());
        }
    };

    return (
        <SelectProvider>
            <View style={styles.container}>
                <View style={styles.container}>
                    <Button title="Open" onPress={onPress} />
                    <Button title="Reset" onPress={onClear} />
                    <Button title="Get current Select state" onPress={onGetState} />
                    <Select ref={ref} options={data} />
                </View>
    
                <ScrollView style={{ flex: 1 }}>
                    <Text style={{ marginTop: 20 }}>
                        State: {JSON.stringify(currentState, null, 4)}
                    </Text>
                </ScrollView>
            </View>
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

### With React Hook Form

```SnackPlayer name=With React Hook Form&dependencies=@mobile-reality/react-native-select-pro@2.0.0,react-hook-form@7.43.0
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View, StyleSheet } from 'react-native';
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

const App = () => {
    const { watch, control } = useForm();
    return (
        <SelectProvider>
            <View style={styles.container}>
                <Text style={{ margin: 20 }}>
                    Chosen: {watch()['select-name']?.label}
                </Text>
                <Controller
                    control={control}
                    name="select-name"
                    render={({ field }) => {
                        return <Select options={data} onSelect={field.onChange} />;
                    }}
                />
            </View>
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

### Scroll to selected option

```SnackPlayer name=Scroll to selected option&dependencies=@mobile-reality/react-native-select-pro@2.0.0,react-hook-form@7.43.0
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

const data = [
    {
        value: '96d27ec5-e196-4577-b18d-31c74ca9145c',
        label: 'First label',
    },
    {
        value: '2805f95f-f712-4dc2-ae25-0910f95152b6',
        label: 'Second label in options list.',
    },
    {
        value: '84bc47cd-c8ab-4673-b428-3d96876f0a3f',
        label: 'THIRD LABEL',
    },
    {
        value: 'aee6e7cd-6f36-4e69-acae-0dbfdaa428e4',
        label: '----Fourth label----',
    },
    {
        value: '170dcd29-0fd5-4f8b-ac76-7d52cdeca89c',
        label: '🐈🐈🐈 Fifth label',
    },
    {
        value: '0b8e1c91-e6d5-487e-bac5-8e1193d2e6f7',
        label: 'Last',
    },
];

const App = () => {
    return (
        <SelectProvider>
            <View style={styles.container}>
                <Text>Scroll to selected option</Text>
                <Select animation={false} options={data} />
                <Text>Scroll to selected option with default option</Text>
                <Select animation={false} defaultOption={data[4]} options={data} />
                <Text>Scroll to selected option is disabled</Text>
                <Select 
                    animation={false}
                    options={data}
                    scrollToSelectedOption={false}
                 />
                <Text>Scroll to selected option with changed height of the option</Text>
                <Select
                    animation={false}
                    options={data}
                    styles={{ option: { container: { height: 60 } } }}
                />
            </View>
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

### Scroll view

```SnackPlayer name=Scroll view&dependencies=@mobile-reality/react-native-select-pro@2.0.0,react-hook-form@7.43.0
import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
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

const App = () => {
    return (
        <SelectProvider>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>
                        When using ScrollView 
                        together with Select, there are two key things to keep in
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
        </SelectProvider>
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

### Searchable in modal

```SnackPlayer name=Searchable in modal&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Select, SelectModalProvider, SelectProvider } from '@mobile-reality/react-native-select-pro';

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

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SelectProvider>
            <View style={styles.container}>
                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                    <SelectModalProvider>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable>
                                <Select options={data} searchable={true} />
                            </View>
                        </View>
                    </SelectModalProvider>
                </Modal>
                <Text>Search sth...</Text>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable>
            </View>
        </SelectProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        borderWidth: 3,
        borderColor: 'black',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        zIndex: 0,
        height: 200,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default App;
```

### Searchable with keyboard avoid view

```SnackPlayer name=Searchable with keyboard avoid view&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import type { ReactNode } from 'react';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, StyleSheet, View } from 'react-native';
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

const KeyboardAware = ({ children }: { children: ReactNode }) => (
    <KeyboardAvoidingView
        style={{
            flex: 1,
            justifyContent: 'space-between',
            width: '100%',
        }}
        behavior={Platform.select({ ios: 'padding', android: 'height' })}
    >
        {children}
    </KeyboardAvoidingView>
);

const App = () => {
    return (
        <SelectProvider>
            <View style={styles.container}>
                <KeyboardAware>
                    <Text>Some content...</Text>
                    <Text>Some content...</Text>
                    <Text>Some content...</Text>
                    <Select options={data} searchable={true} />
                    <Text>Some content...</Text>
                </KeyboardAware>
            </View>
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

### Sections with multiselect

```SnackPlayer name=Sections with multiselect&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import React from 'react';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';
import { View, StyleSheet } from 'react-native';

const SECTIONS_DATA = [
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

const App = () => {
    return (
        <SelectProvider>
            <View style={styles.container}>
                <Select options={SECTIONS_DATA} multiple={true} />
            </View>
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

### Sections with searchable

```SnackPlayer name=Sections with searchable&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import React from 'react';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';
import { View, StyleSheet } from 'react-native';

const SECTIONS_DATA = [
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

const App = () => {
    return (
        <SelectProvider>
            <View style={styles.container}>
                <Select options={SECTIONS_DATA} searchable={true} />
            </View>
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

### Selects

```SnackPlayer name=Selects&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
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

const App = () => {
    return (
        <SelectProvider>
            <View style={styles.container}>
                <Text>Select number 1</Text>
                <Select options={data} />
                <Text>Select number 2</Text>
                <Select options={data} />
                <Text>Select number 3</Text>
                <Select options={data} />
                <Text>Select number 4</Text>
                <Select options={data} />
                <Text>Select number 5</Text>
                <Select options={data} />
            </View>
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

### Text input props

```SnackPlayer name=Text input props&dependencies=@mobile-reality/react-native-select-pro@2.0.0
import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
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

const App = () => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <SelectProvider>
            <View style={styles.container}>
                <Text style={{ marginBottom: 20 }}>
                    isFocused: {isFocused.toString()}
                </Text>
                <Select
                    options={data}
                    searchable={true}
                    selectInputProps={{
                        onFocus: () => {
                            setIsFocused(true);
                        },
                        onBlur: () => {
                            setIsFocused(false);
                        },
                    }}
                />
            </View>
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