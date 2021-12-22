---
id: required
title: Required props
sidebar_label: Required
---

In `<Select />` is only one required prop

### options
Data should have an array with label and value object. If array is empty then is showing "No options" text.
```typescript jsx
options: OptionsType;
```

#### Example

```typescript jsx
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
