# @mobile-reality/react-native-select-pro

## Installation
```
npm install @mobile-reality/react-native-select-pro
```
or
```
yarn add @mobile-reality/react-native-select-pro
```

## Usage

Firstly wrap your app code in `SelectProvider`

```jsx
import React from 'react';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';

const RootComponent = () => {
    return (
        <SelectProvider>
            {/* rest of your app code */}
        </SelectProvider>
    )
};
```

Then you can use `Select` component

```jsx
import React from 'react';
import { View } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

const SomeComponent = () => {
    return (
        <View>
            <Select {/* One required prop: `options` */}
                options={[{ value: 'somevalue', label: 'somelabel'}]} 
            />
        </View>
    )
};
```

If you want use `Select` component inside `Modal` from `react-native` you need to wrap code inside `Modal` in `SelectModalProvider`

```jsx
import React from 'react';
import { View, Modal, Text } from 'react-native';
import { Select, SelectModalProvider } from '@mobile-reality/react-native-select-pro';

const SomeComponent = () => {
    return (
        <View>
            <Modal> {/* `Modal` from `react-native` */}
                <SelectModalProvider> {/* `SelectModalProvider` wrapping code inside `Modal` */}
                    <Text>Modal</Text>
                    <Select
                        options={[{ value: 'somevalue', label: 'somelabel'}]}
                    />
                </SelectModalProvider>
            </Modal>
        </View>
    )
};
```

## Documentation
https://mobilereality.github.io/react-native-select-pro/

## Example
Clone this repo and next:
```sh
cd example
yarn install
yarn android #run example app for Android
yarn ios #run example app for iOS
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](LICENSE.md)
