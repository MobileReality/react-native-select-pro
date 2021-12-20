---
id: common
title: Common features props
sidebar_label: Common features
---

## Props
### clearable
```typescript jsx
clearable?: boolean
```
If `true` enables a clear button to remove selected option

### disabled
```typescript jsx
disabled?: boolean
```
If `true` disable a select control

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

### noOptionsText
```typescript jsx
noOptionsText?: string;
```
No options text

### defaultOption
```typescript jsx
defaultOption?: OptionType;
```
Set a default option

### hideSelectControlArrow
```typescript jsx
hideSelectControlArrow?: boolean;
```
If `true` hide select control arrow

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

### flatListProps
```typescript jsx
flatListProps?: Omit<FlatListProps<OptionType>, 'data' | 'renderItem' | 'ListEmptyComponent'>;
```
`FlatListProps` imported from `react-native`

### closeDropdownOnSelect
```typescript jsx
closeDropdownOnSelect?: boolean;
```
If `true` close a dropdown after selected option


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
