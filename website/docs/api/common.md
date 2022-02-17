---
id: common
title: Common features props
sidebar_label: Common features
---

### animated
```typescript jsx
animated?: boolean;
```
If `true` toggling the select is animated

### animationDuration
```typescript jsx
animationDuration?: number;
```
Animation duration in ms

### clearable
```typescript jsx
clearable?: boolean
```
If `true` enables a clear button to remove selected option

### closeDropdownOnSelect
```typescript jsx
closeDropdownOnSelect?: boolean;
```
If `true` close a dropdown after selected option

### defaultOption
```typescript jsx
defaultOption?: OptionType;
```
Set a default option

### disabled
```typescript jsx
disabled?: boolean
```
If `true` disable a select control

### flatListProps
```typescript jsx
flatListProps?: Omit<FlatListProps<OptionType>, 'data' | 'renderItem' | 'ListEmptyComponent'>;
```
`FlatListProps` imported from `react-native`

### hideSelectControlArrow
```typescript jsx
hideSelectControlArrow?: boolean;
```
If `true` hide select control arrow

### noOptionsText
```typescript jsx
noOptionsText?: string;
```
No options text

### placeholderText
```typescript jsx
placeholderText?: string;
```
Placeholder text

### scrollToSelectedOption
```typescript jsx
scrollToSelectedOption?: boolean;
```
If `true` options list is scrolled to the selected option

### searchable
```typescript jsx
searchable?: boolean;
```
If `true` let user search in a select options by typing in select

### searchPattern
```typescript jsx
searchPattern?: (payload: string) => string;
```
Regex definition for searching options
