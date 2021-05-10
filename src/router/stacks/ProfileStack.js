import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Profile } from '../../screens';

function ProfileStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={Profile}
            />
        </Stack.Navigator>
    );
}

export default ProfileStack;