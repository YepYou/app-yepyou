import React, {useState, useEffect, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthNavigator, MainNavigator} from '../router/index';
import AuthContext from '../context/AuthContext';
import MissionContext from '../context/MissionContext';

import Loading from './Loading';

// import api from '../services/api';

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [mission, setMission] = useState(null);

  const authContext = useMemo(() => ({
    user,
    signin: setUser,
    signout: () => setUser(null),
    signup: setUser,
  }));

  const missionContext = useMemo(() => ({
    mission,
    start: setMission,
    finish: () => setMission(null),
  }));

  async function getUser() {
    const userStorage = await AsyncStorage.getItem('@yepyou_user');

    setUser(userStorage ? JSON.parse(userStorage) : false);
    setIsLoading(false);
  }

  /*
    async function getHeaders() {
        api.defaults.headers['token'] = await AsyncStorage.getItem('token');
    }
    */

  useEffect(() => {
    getUser();
    // getHeaders();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <MissionContext.Provider value={missionContext}>
        <NavigationContainer>
          {user ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </MissionContext.Provider>
    </AuthContext.Provider>
  );
};

export default AppNavigator;
