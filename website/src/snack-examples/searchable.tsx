import React from 'react';
import { SnackLink } from '@site/src/components/snack-link';

const contents = `
import type { ReactNode } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Select, SelectProvider } from '@mobile-reality/react-native-select-pro';

const KeyboardAware = ({ children }: { children: ReactNode }) => (
    <KeyboardAvoidingView
        style={{
            flex: 1,
            justifyContent: 'space-between',
        }}
        behavior={Platform.select({ ios: 'padding', android: 'height' })}
    >
        {children}
    </KeyboardAvoidingView>
);

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
        <KeyboardAware>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Select options={DATA} searchable={true} />
            </View>
        </KeyboardAware>
      </SelectProvider>
    );
};

export default App;
`;

export const Searchable = () => <SnackLink contents={contents} name="searchable prop" />;
