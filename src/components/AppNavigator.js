import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthNavigator, MainNavigator } from '../router/index';
import AuthContext from '../context/AuthContext';

import Apresentation from './Apresentation';
import Loading from './Loading';

import api from '../services/api';

const AppNavigator = () => {
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const authContext = useMemo(() => ({
        user,
        signin: setUser,
        signout: () => setUser(null),
        signup: setUser
    }));

    async function getUser() {
        const userStorage = await AsyncStorage.getItem('user');

        setUser(userStorage ? JSON.parse(userStorage) : false);
        setIsLoading(false);
    }

    async function getHeaders() {
        api.defaults.headers['access-token'] = await AsyncStorage.getItem('access-token');
        api.defaults.headers['client'] = await AsyncStorage.getItem('client');
        api.defaults.headers['uid'] = await AsyncStorage.getItem('uid');;
    }


    useEffect(() => {
        firsTimeVerify();

        async function firsTimeVerify() {
            try {
                const alreadyLaunche = await AsyncStorage.getItem('alreadyLaunched');

                if (!alreadyLaunche) {
                    setIsFirstTime(true);
                }
            } catch (error) {
                console.log('Error: firsTimeVerify - ', error);
            }
        }

        getUser();
        getHeaders();
    }, []);

    if (isFirstTime) {
        return <Apresentation setIsFirstTime={setIsFirstTime} />
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>
                { user ?
                    <MainNavigator />
                    : <AuthNavigator />
                }
            </AuthContext.Provider>
        </NavigationContainer>
    );
};

export default AppNavigator;