import { AppRegistry } from 'react-native';
import { App } from '@monorepo/expo/src/App';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
