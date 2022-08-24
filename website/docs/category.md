---
id: category
title: Category
sidebar_label: Category
---

To categorize your items they should follow the next structure:

```jsx
const myCategorizedList = [
    { label: 'Europe', value: 'eu' },
    { label: 'Poland 🇵🇱', value: 'poland', parent: 'eu' },
    { label: 'Belgium 🇧🇪', value: 'belgium', parent: 'eu' },
    { label: 'Greece 🇬🇷', value: 'greece', parent: 'eu' },
    { label: 'Croatia 🇭🇷', value: 'croatia', parent: 'eu' },
    { label: 'South America', value: 'sa' },
    { label: 'Argentina 🇦🇷', value: 'argentina', parent: 'sa' },
    { label: 'Peru 🇵🇪', value: 'peru', parent: 'sa' },
    { label: 'Brazil 🇧🇷', value: 'brazil', parent: 'sa' },
];
```

The children items should have the parent's value as their parent key.
