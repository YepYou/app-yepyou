import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../../screens';

function MenuStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarOptions: {
                    style: {
                      backgroundColor: 'white',
                      alignItems: 'center',
                    },
                    labelStyle: {
                      fontSize: 16,
                    },
                    activeTintColor: '#444444',
                    inactiveTintColor: 'lightgrey',
                    showIcon: false,
                  },
            }}>

            <Stack.Screen
                name="Profile"
                component={Profile}
            />
        </Stack.Navigator>
    );
}

export default MenuStack;