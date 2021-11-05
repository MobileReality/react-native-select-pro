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

```tsx
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

```tsx
import React from 'react';
import { View } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

const SomeComponent = () => {
    return (
        <View>
            <Select
                options={[{ value: 'somevalue', label: 'somelabel'}]} 
            />
        </View>
    )
};
```

If you want use `Select` component inside `Modal` from `react-native` you need to wrap code inside `Modal` in `SelectModalProvider`

```tsx
import React from 'react';
import { View, Modal, Text } from 'react-native';
import { Select, SelectModalProvider } from '@mobile-reality/react-native-select-pro';

const SomeComponent = () => {
    return (
        <View>
            <Modal>
                <SelectModalProvider>
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
TODO...

[Docs](docs/index.html)

## Example
Clone this repo and next:
```sh
cd example
yarn install
yarn android #for Android
yarn ios #for iOS
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](LICENSE.md)
