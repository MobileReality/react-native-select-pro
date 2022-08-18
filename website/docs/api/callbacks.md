---
id: callbacks
title: Callbacks props
sidebar_label: Callbacks
---

### onDropdownClosed()
```typescript jsx
function onDropdownClosed() => void;
```
Callback that is called when dropdown is closed

### onDropdownOpened()
```typescript jsx
function onDropdownOpened() => void;
```
Callback that is called when dropdown is opened

### onSelect()
```typescript jsx
function onSelect(option: OptionType | null, optionIndex: number) => void;
```
Callback that is called when option is selected

### onRemove()
```typescript jsx
function onRemove(option: OptionType | OptionType[] | null, optionIndex: number | number[]) => void;
```
Callback that is called when option is cleared. It's also called when you use `clear()`. For multiselect `clear()` will return array of removed options and array of removed indexes.