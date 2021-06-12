import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { World, Mission, Missions } from '../../screens';
import { MissionConfirm } from '../../screens/mission';

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
            
            <Stack.Screen
                name="MissionConfirm" 
                component={MissionConfirm}
            />

            <Stack.Screen
                name="Mission" 
                component={Mission}
            />
        </Stack.Navigator>
    );
}

export default WorldStack;