import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { World, Missions, Profile } from '../../screens';

function WorldStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>

            <Stack.Screen
                name="World" 
                component={World}
            />

            <Stack.Screen
                name="Missions" 
                component={Missions}
            />
        </Stack.Navigator>
    );
}

export default WorldStack;