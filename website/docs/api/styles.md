---
id: styles
title: Styles props
sidebar_label: Styles
---

### selectControlStyles

```typescript jsx
selectControlStyles?: {
    // Style of text select control
    textStyle?: StyleProp<TextStyle>;
    // Style of select control container
    containerStyle?: StyleProp<ViewStyle>;
    // Style of disabled select control
    disabledStyle?: StyleProp<TextStyle>;
    // Style of container buttons in select control
    buttonsContainerStyle?: StyleProp<ViewStyle>;
    // Style of multiselection option
    multiSelectionOptionStyle?: StyleProp<ViewStyle>;
}
```

### arrowIconStyles

```typescript jsx
    arrowIconStyles?: {
        // Style of arrow image
        iconStyle?: StyleProp<ImageStyle>;
        // Custom select control arrow icon source
        iconSource?: ImageSourcePropType;
    };
```

### clearOptionStyles
```typescript jsx
    clearOptionStyles?: {
        // Style of clear option button
        buttonStyle?: StyleProp<ViewStyle>;
        // Hit Slop for clear option button
        buttonHitSlop?: Insets;
        // Style of clear option image
        iconStyle?: StyleProp<ImageStyle>;
    };
```

### customLeftIconStyles
```typescript jsx
    customLeftIconStyles?: {
        // Style of custom left icon
        iconStyle?: StyleProp<ImageStyle>;
        // Custom left icon source
        iconSource?: ImageSourcePropType;
    }
```

### optionsListStyles

```typescript jsx
optionsListStyles?: {
    // Style of options list
    containerStyle?: StyleProp<ViewStyle>;
    // Style of single option
    optionStyle?: StyleProp<ViewStyle>;
    // Style of single option text
    optionTextStyle?: StyleProp<TextStyle>;
    // Style of selected single option
    optionSelectedStyle?: StyleProp<ViewStyle>;
    // Style of section header container when section data type is provided
    sectionHeaderContainerStyle?: StyleProp<ViewStyle>;
    // Style of section header text when section data type is provided
    sectionHeaderTextStyle?: StyleProp<TextStyle>;
}
```

### placeholderTextColor

```typescript jsx
placeholderTextColor?: string;
```

Set a placeholder color

### containerStyle

```typescript jsx
containerStyle?: StyleProp<ViewStyle>;
```

Style of main container
