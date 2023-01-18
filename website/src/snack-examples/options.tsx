import React from 'react';
import { SnackLink } from '@site/src/components/snack-link';

const contents = `
import { View, Text } from 'react-native';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

const App = () => {
    const DATA = [
      {
          label: 'Option 1',
          value: 'option1',
      },
      {
          label: 'Option 2',
          value: 'option2',
      },
      {
          label: 'Option 3',
          value: 'option3',
      },
      {
          label: 'Option 4',
          value: 'option4',
      },
    ];
    
    const SECTIONS_DATA = [
    {
        title: 'North America',
        data: [
            {
                value: 'us',
                label: 'United States of America',
            },
            {
                value: 'ca',
                label: 'Canada',
            },
        ],
    },
    {
        title: 'Europe',
        data: [
            {
                value: 'pl',
                label: 'Poland',
            },
            {
                value: 'es',
                label: 'Spain',
            },
            {
                value: 'fr',
                label: 'France',
            },
        ],
    },
];
    
    return (
      <SelectProvider>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Basic</Text>
          <Select options={DATA} />
          <Text>Sections</Text>
          <Select options={SECTIONS_DATA} />
        </View>
      </SelectProvider>
    );
};

export default App;
`;

export const OptionsPropSnackLink = () => <SnackLink contents={contents} name="options prop" />;
