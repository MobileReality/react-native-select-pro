---
id: styles
title: Styles props
sidebar_label: Styles
---

### selectControlStyles

```typescript jsx
// Style of main container
styles?: {
    // Style of select control container
    select: {
        // Style of text in select control
        text?: StyleProp<TextStyle>;
        // Style of disabled select control
        disabled?: StyleProp<TextStyle>;
        // Style of buttons container in select control
        buttons: StyleProp<ViewStyle>;
        // Style of selected option in select control if multiSelection is enabled
        multiSelectedOption?: {
            // Style of text in selected option if multiSelection is enabled
            text?: StyleProp<TextStyle>;
        } & StyleProp<ViewStyle>;
        arrow: {
            // Style of arrow image
            icon?: StyleProp<ImageStyle>;
            // Custom arrow icon source
            source?: ImageSourcePropType;
        };
        clear: {
            // Style of clear option button
            button?: StyleProp<ViewStyle>;
            // Hit Slop of clear option button
            hitSlop?: Insets;
            // Style of clear option image
            icon?: StyleProp<ImageStyle>;
        };
    } & StyleProp<ViewStyle>
    // Style of options list container
    optionsList: StyleProp<ViewStyle>
    // Style of section header container
    sectionHeader?: {
        // Style of section header title
        text?: StyleProp<TextStyle>;
        // Style of section header clear icon when all section options are selected
        clearIcon?: StyleProp<ImageStyle>;
        // Style of section header when all section options are selected
        selected?: StyleProp<ViewStyle>;
        // Style of section header title when all section options are selected
        selectedText?: StyleProp<TextStyle>;
        // Style of section header clear icon all section options are selected
        selectedClearIcon?: StyleProp<ImageStyle>;
    } & StyleProp<ViewStyle>
    // Style of single option container
    option: {
        // Style of single option text
        text?: StyleProp<TextStyle>;
        // Style of selected single option
        selected?: StyleProp<ViewStyle>;
        // Style of selected single option text
        selectedText?: StyleProp<TextStyle>;
    } & StyleProp<ViewStyle>
}
```

### placeholderTextColor

```typescript jsx
placeholderTextColor?: string;
```

Set a placeholder color
