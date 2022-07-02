---
id: refs
title: Refs
sidebar_label: Refs
---

## Example

Open a dropdown with ref

```typescript jsx
import React from 'react';
import { View, Button } from 'react-native';
import { Select } from '@mobile-reality/react-native-select-pro';

const SomeComponent = () => {
  const ref = useRef();
  
  const onOpenDropdown = () => {
    if (ref.current) {
      ref.current.open();
    }
  }
  
  return (
    <View>
      <Select
        ref={ref}
        options={[{ value: 'somevalue', label: 'somelabel' }]}
      />
      <Button title="Open" onPress={onOpenDropdown} />
    </View>
  )
};
```

## API

### clear()
```typescript jsx
function clear() => void;
```
Clear a selected option

### open()
```typescript jsx
function open() => void;
```
Open a dropdown

### close()
```typescript jsx
function close() => void;
```
Close a dropdown

### getState()
```typescript jsx
function getState() => State;
```
Get current state of select
