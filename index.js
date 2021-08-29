import Reactotron from 'reactotron-react-native';
import {NativeModules} from 'react-native';

const {scriptURL} = NativeModules.SourceCode;
const host = scriptURL.split('://')[1].split(':')[0];

if (__DEV__) {
  Reactotron.configure({
    name: 'YepYou',
    host,
  })
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate/,
      },
    })
    .connect()
    .clear();
}

console.tron = Reactotron;

import {registerRootComponent} from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
