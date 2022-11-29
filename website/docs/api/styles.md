---
id: styles
title: Styles props
sidebar_label: Styles
---

### selectControlStyles

```typescript jsx
// Style of select control container
styles?: {
    select: {
        // Style of text select control
        text?: StyleProp<TextStyle>;
        // Style of disabled select control
        disabled?: StyleProp<TextStyle>;
        // Style of container buttons in select control
        buttons: StyleProp<ViewStyle>;
        // Style of multiselection option
        multiSelectionOption?: StyleProp<ViewStyle>;
        arrow: {
            // Style of arrow image
            icon?: StyleProp<ImageStyle>;
            // Custom select control arrow icon source
            source?: ImageSourcePropType;
        };
        clear: {
            // Style of clear option button
            button?: StyleProp<ViewStyle>;
            // Hit Slop for clear option button
            hitSlop?: Insets;
            // Style of clear option image
            icon?: StyleProp<ImageStyle>;
        };
    },
    // Style of options list container
    optionsList: {
        // Style of section header
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
    },
    // Style of single option container
    option: {
        // Style of single option text
        text?: StyleProp<TextStyle>;
        // Style of selected single option
        selected?: StyleProp<ViewStyle>;
        // Style of selected single option text
        selectedText?: StyleProp<TextStyle>;
    }

}
```

### placeholderTextColor

```typescript jsx
placeholderTextColor?: string;
```

Set a placeholder color
