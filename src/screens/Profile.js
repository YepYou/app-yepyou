import React, { useContext } from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from '../context/AuthContext';

const Profile = () => {
    const { signout: ctxSignout, user } = useContext(AuthContext);

    async function handleSignout() {
        await AsyncStorage.removeItem('@yepyou:user');

        ctxSignout();
    }

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text category='h1'>{user.investor_name}</Text>
            <Button
                onPress={handleSignout}>
                Logout
            </Button>
        </Layout>
    );
};

export default Profile;