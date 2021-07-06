import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Mission } from '../../screens';
import {MissionConfirm, MaterialList} from '../../screens/mission';

function MissionStack({navigation, route}) {
    const Stack = createStackNavigator();
		const {mission} = route.params;

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="MissionConfirm" 
                component={() => <MissionConfirm mission={mission} />}
            />
            <Stack.Screen
                name="MaterialList"
                component={MaterialList}
            />
            <Stack.Screen
                name="Mission" 
                component={Mission}
            />
        </Stack.Navigator>
    );
}

export default MissionStack;