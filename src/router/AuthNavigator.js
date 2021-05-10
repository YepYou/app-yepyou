import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SigninStack } from './stacks';

function AuthNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Signin"
                component={SigninStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default AuthNavigator;