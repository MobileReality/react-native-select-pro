<div align="center">
    <img alt="React Native Select Pro" src="https://user-images.githubusercontent.com/11172548/144605214-d7f88315-df04-434d-a45f-ae0bbc087c8b.png" width="800" />
</div>

---
<p align="center">
  React Native dropdown (select) component developed by <a href='https://mobilereality.pl/en' target='_blank'>Mobile Reality</a>
</p>

---

[![Version](https://img.shields.io/npm/v/@mobile-reality/react-native-select-pro?style=for-the-badge)](https://www.npmjs.com/package/@mobile-reality/react-native-select-pro)
[![GitHub stars](https://img.shields.io/github/stars/MobileReality/react-native-select-pro?style=for-the-badge)](https://github.com/MobileReality/react-native-select-pro/stargazers)
[![npm total downloads](https://img.shields.io/npm/dt/@mobile-reality/react-native-select-pro?style=for-the-badge)](https://www.npmjs.com/package/@mobile-reality/react-native-select-pro)
[![npm week downloads](https://img.shields.io/npm/dw/@mobile-reality/react-native-select-pro?style=for-the-badge)](https://www.npmjs.com/package/@mobile-reality/react-native-select-pro)
[![Last master branch commit](https://img.shields.io/github/last-commit/MobileReality/react-native-select-pro/master?style=for-the-badge)](https://github.com/MobileReality/react-native-select-pro/commits/master)
[![License](https://img.shields.io/github/license/MobileReality/react-native-select-pro?style=for-the-badge)](https://github.com/MobileReality/react-native-select-pro/blob/master/LICENSE.md)

## Features

* Customizable
* Searchable
* Animations
* Multi select
* Android / iOS / Expo support
* TypeScript support
* Based on `react-native-portal`

## Example

### Expo Snack

[Example on Expo](https://snack.expo.dev/@irekrog/smelly-beef-jerky)

### Video preview

https://user-images.githubusercontent.com/11172548/178573663-1059862d-20c4-4d44-86e3-8438de630475.mp4

### Repo

Clone this repo https://github.com/MobileReality/react-native-select-pro and next:

```sh
cd apps/expo
yarn dev-start
```

## Documentation

https://mobilereality.github.io/react-native-select-pro/

## Getting Started

### Installation

```
npm install @mobile-reality/react-native-select-pro
```

or

```
yarn add @mobile-reality/react-native-select-pro
```

### Usage

Firstly, wrap your app code in `SelectProvider`

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
                options={[{ value: 'somevalue', label: 'somelabel' }]}
            />
        </View>
    )
};
```

If you want to use `Select` component inside:

* `Modal` from `react-native` / `react-native-modal`
* `BottomSheet` from `react-native-bottom-sheet`

you need to wrap code inside `Modal` / `BottomSheet` in `SelectModalProvider`

```jsx
import React from 'react';
import { View, Modal, Text } from 'react-native';
import { Select, SelectModalProvider } from '@mobile-reality/react-native-select-pro';

const SomeComponent = () => {
    return (
        <View>
            <Modal> {/* e.g. `Modal` from `react-native` */}
                <SelectModalProvider> {/* `SelectModalProvider` wrapping code inside `Modal` */}
                    <Text>Modal</Text>
                    <Select
                        options={[{ value: 'somevalue', label: 'somelabel' }]}
                    />
                </SelectModalProvider>
            </Modal>
        </View>
    )
};
```

## Thanks

* Used [react-native-portal](https://github.com/gorhom/react-native-portal), thanks
  to [@gorhom](https://github.com/gorhom) for great library 🎉
* Built with [@react-native-community/bob](https://github.com/react-native-community/bob) 🚀
* Docs built with [Docusaurus](https://docusaurus.io/) 🙌

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](LICENSE.md)

## Want more from Mobile Reality?

Contact with us https://mobilereality.pl/en
