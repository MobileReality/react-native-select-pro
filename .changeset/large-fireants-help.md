---
'@mobile-reality/react-native-select-pro': minor
---

Now you can pass second available data structure - Section List:

```jsx
import React from 'react';
import { View } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

const SomeComponent = () => {
    return (
        <View>
            <Select
                options={
                    [
                        {
                            title: 'sometitle',
                            data: { value: 'somevalue', label: 'somelabel' },
                        },
                    ];
                }
            />
        </View>
    )
};
```
