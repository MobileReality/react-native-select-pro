import React from 'react';
import { SnackLink } from '@site/src/components/snack-link';

const contents = `
import { View } from 'react-native';
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
    return (
      <SelectProvider>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Select options={DATA} placeholderTextColor="#71C562" />
        </View>
      </SelectProvider>
    );
};

export default App;
`;

export const PlaceholderTextColor = () => <SnackLink contents={contents} name="placeholderTextColor prop" />;
