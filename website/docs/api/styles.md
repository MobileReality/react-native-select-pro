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
        // Style of section header container when section data type is provided
        sectionHeader?: StyleProp<ViewStyle>;
        // Style of section header text when section data type is provided
        sectionTitle?: StyleProp<TextStyle>;
    },
    // Style of single option container
    option: {
        // Style of single option text
        text?: StyleProp<TextStyle>;
        // Style of selected single option
        selected?: StyleProp<ViewStyle>;
    }

}
```

### placeholderTextColor

```typescript jsx
placeholderTextColor?: string;
```

Set a placeholder color
