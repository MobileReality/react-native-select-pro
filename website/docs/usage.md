---
id: basic-usage
title: Basic usage
sidebar_label: Basic usage
---

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

Additionally you can pass second available data structure:

```typescript jsx
[
    {
        title: 'sometitle',
        data: { value: 'somevalue', label: 'somelabel' },
    },
];
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


