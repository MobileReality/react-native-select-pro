---
id: select
title: Select
sidebar_label: Select
---

## Props
### options
Options to show on the list

### defaultOption
```typescript jsx
defaultOption?: OptionType;
```
Set a default option

### selectControlTextStyle
```typescript jsx
selectControlTextStyle?: StyleProp<TextStyle>;
```
Style of text select control

### selectControlStyle
```typescript jsx
selectControlStyle?: StyleProp<ViewStyle>;
```
Style of select control

### selectControlDisabledStyle
```typescript jsx
selectControlDisabledStyle?: StyleProp<TextStyle>;
```
Style of disabled select control

### selectControlButtonsContainerStyle
```typescript jsx
selectControlButtonsContainerStyle?: StyleProp<ViewStyle>;
```
Style of container buttons in select control

### selectControlClearOptionButtonStyle
```typescript jsx
selectControlClearOptionButtonStyle?: StyleProp<ViewStyle>;
```
Style of clear option button

### selectControlClearOptionImageStyle
```typescript jsx
selectControlClearOptionButtonHitSlop?: Insets;
```
Hit Slop for clear option button

### selectContainerStyle
```typescript jsx
selectContainerStyle?: StyleProp<ViewStyle>;
```
Style of container select control

### optionsListStyle
```typescript jsx
optionsListStyle?: StyleProp<ViewStyle>;
```
Style of options list

### hideSelectControlArrow
```typescript jsx
hideSelectControlArrow?: boolean;
```
If `true` hide select control arrow

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

### optionStyle
```typescript jsx
optionStyle?: StyleProp<ViewStyle>;
```
Style of single option

### optionTextStyle
```typescript jsx
optionTextStyle?: StyleProp<TextStyle>;
```
Style of single option text

### optionSelectedStyle
```typescript jsx
optionSelectedStyle?: StyleProp<ViewStyle>;
```
Style of selected single option

### selectControlClearOptionA11yLabel
```typescript jsx
selectControlClearOptionA11yLabel?: string;
```

### selectControlOpenDropdownA11yLabel
```typescript jsx
selectControlOpenDropdownA11yLabel?: string;
```

### selectControlCloseDropdownA11yLabel
```typescript jsx
selectControlCloseDropdownA11yLabel?: string;
```

### NoOptionsComponent
```typescript jsx
NoOptionsComponent?: JSX.Element;
```
No options custom component

### OptionComponent
```typescript jsx
OptionComponent?: (props: OptionComponentProps) => JSX.Element;
```
Single option custom component

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

## Callbacks
### onSelect()
```typescript jsx
function onSelect(option: OptionType | null) => void;
```
Callback that is called when option is selected

### onDropdownOpened()
```typescript jsx
function onDropdownOpened() => void;
```
Callback that is called when dropdown is opened

### onDropdownClosed()
```typescript jsx
function onDropdownClosed() => void;
```
Callback that is called when dropdown is closed


