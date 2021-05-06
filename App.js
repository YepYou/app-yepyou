import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Login } from './src/Login';
import { default as theme } from './src/styles/theme.json';
import { default as mapping } from './src/styles/mappding.json';

// import { AppNavigator } from './src/components';
// <AppNavigator />
const App = () => (
    <>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} 
          theme={{ ...eva.light, ...theme }}
          customMapping={mapping}>
            <Login />
        </ApplicationProvider>
    </>
);

export default App;