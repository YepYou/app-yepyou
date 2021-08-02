import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { YepBoards } from '../../screens';

const YepBoardStack = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{
					headerShown: false,
			}}>
			<Stack.Screen
				name="YepBoards"
				component={YepBoards}
			/>
		</Stack.Navigator>
	);
}

export default YepBoardStack;