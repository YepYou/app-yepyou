import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@ui-kitten/components';

import { World, Missions } from '../../screens';
import colors from '../../styles/palette.json';

function WorldStack() {
    const Stack = createStackNavigator();
    const theme = useTheme();

    return (
        <Stack.Navigator 
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme['color-primary-500'],
                    height: 140
                },
                headerTintColor: colors.headerText,
                headerTitleStyle: {
                    alignSelf: 'center',
                    fontWeight: 'bold'
                }
            }}>

            <Stack.Screen
                name="World" 
                component={World}
                options={{
                    title: 'Mundos' 
                }}
            />

            <Stack.Screen
                name="Missions" 
                component={Missions}
                options={{
                    title: 'Missões' 
                }}
            />
        </Stack.Navigator>
    );
}

export default WorldStack;