---
id: select-modal
title: SelectModalProvider
sidebar_label: SelectModalProvider
---

If you want to use `Select` component inside `Modal` from `react-native` (or `react-native-modal`) you need to wrap code inside `Modal` in `SelectModalProvider`

### children
```typescript jsx
children: React.ReactNode;
```

#### Example
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
