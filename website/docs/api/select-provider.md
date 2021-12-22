---
id: select-provider
title: SelectProvider
sidebar_label: SelectProvider
---

`<SelectProvider>` must wrap a whole app, so should be placed in the root app component file (index.js, App.js or sth like that). So children of this component is one required prop.

### children
```typescript jsx
children: React.ReactNode;
```

#### Example

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
