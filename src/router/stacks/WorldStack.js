import React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { useTheme } from '@ui-kitten/components';

import { World, Missions } from '../../screens';
import colors from '../../styles/palette.json';

function WorldStack() {
    const Stack = createStackNavigator();
    const theme = useTheme();

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
                name="Missões" 
                component={Missions}
            />
        </Stack.Navigator>
    );
}

export default WorldStack;