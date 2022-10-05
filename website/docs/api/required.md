---
id: required
title: Required props
sidebar_label: Required
---

In `<Select />` is only one required prop

### options

```typescript jsx
options: OptionsType;
```

Data can be passed as an array with label and value object

```typescript jsx
[{ value: 'somevalue', label: 'somelabel' }];
```

OR as an array with structure known from react-native SectionList

```typescript jsx
[
    {
        title: 'sometitle',
        data: { value: 'somevalue', label: 'somelabel' },
    },
];
```

For now options list with sections are not working with multiSelection, searchable and scrollToSelectedOption. We will unblock all of the features soon.

If array is empty then is showing "No options" text.

#### Example

```typescript jsx
import React from 'react';
import { View } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

const SomeComponent = () => {
    return (
        <View>
            <Select options={[{ value: 'somevalue', label: 'somelabel' }]} />
        </View>
    );
};

const SomeComponentWithSectionList = () => {
    return (
        <View>
            <Select
                options={[
                    {
                        title: 'sometitle',
                        data: { value: 'somevalue', label: 'somelabel' },
                    },
                ]}
            />
        </View>
    );
};
```
