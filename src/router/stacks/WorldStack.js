import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { World } from '../../screens';

function WorldStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="World" component={World} />
        </Stack.Navigator>
    );
}

export default WorldStack;