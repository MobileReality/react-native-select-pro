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
function onSelect(option: OptionType, optionIndex: number) => void;
```
Callback that is called when option is selected

### onRemove()
```typescript jsx
function onRemove(option: OptionType | OptionType[] | null, optionIndex: number | number[]) => void;
```
Callback that is called when option is cleared. It's also called when you use `clear()`. For multiselect `option` will be an array of removed options and `optionIndex` will be an array of removed indexes

### onSectionSelect()
```typescript jsx
function onSectionSelect(option: OptionType[], optionIndexes: number[]) => void;
```
Callback that is called when section is selected by pressing section header. `option` will be an array of section options that are NOT yet selected. (You need to add `onSectionSelect` , `onSectionRemove`, `multiSelection={true}` to use this feature).
 
### onSectionRemove()
```typescript jsx
function onSectionRemove(option: OptionType[], optionIndexes: number[]) => void;
```
Callback that is called when section is removed by pressing section header. `option` will be an array of all section options. (You need to add `onSectionSelect` , `onSectionRemove`, `multiSelection={true}` to use this feature).