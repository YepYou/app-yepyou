import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Worlds, Missions } from '../../screens';
import MissionStack from './MissionStack';

function WorldStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="Worlds" 
                component={Worlds}
            />
            <Stack.Screen
                name="Missions" 
                component={Missions}
            />
            <Stack.Screen
                name="MissionStack"
                component={MissionStack}
            />
        </Stack.Navigator>
    );
}

export default WorldStack;