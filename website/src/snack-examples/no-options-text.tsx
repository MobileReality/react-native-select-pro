import React from 'react';
import { SnackLink } from '@site/src/components/snack-link';

const contents = `
import { View } from 'react-native';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

const App = () => {
    return (
      <SelectProvider>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Select options={[]} noOptionsText="Empty list :(" />
        </View>
      </SelectProvider>
    );
};

export default App;
`;

export const NoOptionsText = () => <SnackLink contents={contents} name="noOptionsText prop" />;
