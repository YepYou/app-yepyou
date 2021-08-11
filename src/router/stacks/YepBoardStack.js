import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {YepBoards, MissionYepBoard} from '../../screens';

const YepBoardStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="YepBoards" component={YepBoards} />
      <Stack.Screen name="MissionYepBoard" component={MissionYepBoard} />
    </Stack.Navigator>
  );
};

export default YepBoardStack;
