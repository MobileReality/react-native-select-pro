# @mobile-reality/react-native-select-pro

[![Version](https://img.shields.io/npm/v/@mobile-reality/react-native-select-pro?style=for-the-badge)](https://www.npmjs.com/package/@mobile-reality/react-native-select-pro)
[![GitHub stars](https://img.shields.io/github/stars/MobileReality/react-native-select-pro?style=for-the-badge)](https://github.com/MobileReality/react-native-select-pro/stargazers)
[![npm total downloads](https://img.shields.io/npm/dt/@mobile-reality/react-native-select-pro?style=for-the-badge)](https://www.npmjs.com/package/@mobile-reality/react-native-select-pro)
[![npm week downloads](https://img.shields.io/npm/dw/@mobile-reality/react-native-select-pro?style=for-the-badge)](https://www.npmjs.com/package/@mobile-reality/react-native-select-pro)
[![Last master branch commit](https://img.shields.io/github/last-commit/MobileReality/react-native-select-pro/master?style=for-the-badge)](https://github.com/MobileReality/react-native-select-pro/commits/master)
[![License](https://img.shields.io/github/license/MobileReality/react-native-select-pro?style=for-the-badge)](https://github.com/MobileReality/react-native-select-pro/blob/master/LICENSE.md)



React Native select / dropdown component

## Features
* Customizable
* Android / iOS / Expo supported
* TypeScript supported

## Example

### Expo Snack
[Example on Expo](https://snack.expo.dev/@irekrog/smelly-beef-jerky)

### Video preview

https://user-images.githubusercontent.com/11172548/142592143-fc4ffcc5-2d8f-49ff-aa58-0ae5f9dd46bf.mp4

### Repo
Clone this repo and next:
```sh
cd example
yarn install
yarn android #run example app for Android
yarn ios #run example app for iOS
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
        options={[{ value: 'somevalue', label: 'somelabel'}]} 
      />
    </View>
  )
};
```

If you want to use `Select` component inside `Modal` from `react-native` (or `react-native-modal`) you need to wrap code inside `Modal` in `SelectModalProvider`

```jsx
import React from 'react';
import { View, Modal, Text } from 'react-native';
import { Select, SelectModalProvider } from '@mobile-reality/react-native-select-pro';

const SomeComponent = () => {
  return (
    <View>
      <Modal> {/* `Modal` from `react-native` or `react-native-modal` */}
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
* Used [react-native-portal](https://github.com/gorhom/react-native-portal), thanks to [@gorhom](https://github.com/gorhom) for great library 🎉
* Built with [@react-native-community/bob](https://github.com/react-native-community/bob) 🚀
* Docs built with [TypeDoc](https://typedoc.org/) 🙌

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](LICENSE.md)
