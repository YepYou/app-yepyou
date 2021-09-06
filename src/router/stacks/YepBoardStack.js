import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {YepBoards, MissionYepBoard} from '../../screens';
import MissionContext from '../../context/MissionContext';

const YepBoardStack = () => {
  const Stack = createStackNavigator();
  const {mission} = useContext(MissionContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!mission && <Stack.Screen name="YepBoards" component={YepBoards} />}
      <Stack.Screen name="MissionYepBoard" component={MissionYepBoard} />
    </Stack.Navigator>
  );
};

export default YepBoardStack;
