import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Dimensions, Image, ImageBackground, Platform
} from 'react-native';
import {
    Button, Datepicker, CalendarViewModes, Layout, Input, StyleService, useStyleSheet
} from '@ui-kitten/components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';

import bgLoginScreen from '../../assets/bgLoginScreen.png';
import logoIcon from '../../assets/loginIcon.png';

import NetInfo from "@react-native-community/netinfo";

import AuthContext from '../context/AuthContext';
import api from '../services/api';

const Signin = () => {
    const { signin: ctxSignin } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const now = new Date();
    const min = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 43800);

    const datepickerBirthDate = useRef();

    const styles = useStyleSheet(themedStyles);

    useEffect(() => {
        configScreen();

        async function configScreen() {
            if (Platform.OS === 'android') {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            }
        }
    });

    async function handleSubmit() {
        setLoading(true);
        const netinfo = await NetInfo.fetch();

        if (netinfo.isConnected) {
            try {
                const {data: user} = await api.post('/v1/users',
                    { name, birth }
                );

                if (user) {
                    const { id: _id, name, birth } = user;

                    await AsyncStorage.setItem('@yepyou:user', JSON.stringify({
                        id, name, birth
                    }));

                    ctxSignin({ id, name, birth });
                }


            } catch (error) {
                setError('Não foi possível registrar o usuário no momento.');
            }
        } else {
            setError('Sem conexão com internet');
        }

        setLoading(false);
    }

    return (
        <Layout style={styles.container}>
            <Layout style={styles.header}>
                <ImageBackground source={bgLoginScreen} style={styles.headerBgImage} />

                <Image
                    source={logoIcon}
                    style={styles.headerImage}
                    resizeMode="contain"
              />
          </Layout>

            <Layout style={styles.form}>
                <Input
                    textStyle={styles.textStyleForm}
                    style={styles.input}
                    value={name}
                    label="NOME"
                    onChangeText={(nextValue) => setName(nextValue)}
              />

                <Datepicker
                    textStyle={styles.textStyleForm}
                    ref={datepickerBirthDate}
                    controlStyle={styles.pickerControl}
                    style={styles.picker}
                    label="DATA DE NASCIMENTO"
                    date={birth}
                    min={min}
                    startView={CalendarViewModes.YEAR}
                    placeholder=""
                    onSelect={(nextDate) => setBirth(nextDate)}
              />

                <Button
                    status="success"
                    style={styles.button}
                    onPress={handleSubmit}
              >
                ENTRAR
              </Button>
          </Layout>
      </Layout>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height * 0.95
    },

    form: {
        flex: 1,
        alignItems: 'center'
    },

    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').height * 0.6
    },

    headerBgImage: {
        resizeMode: 'stretch',
        width: '100%',
        flex: 1
    },

    headerImage: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        resizeMode: 'contain',
        top: 50,
        width: 150,
        left: Dimensions.get('window').width * 0.3
    },

    input: {
        borderRadius: 45,
        paddingHorizontal: 35,
        paddingVertical: 10,
        backgroundColor: 'color-primary-default'
    },

    button: {
        borderRadius: 45,
        marginTop: 40,
        width: 140
    },

    picker: {
        width: '100%',
        paddingHorizontal: 35,
        paddingVertical: 10
    },

    pickerControl: {
        borderRadius: 45,
        backgroundColor: 'color-primary-default'
    },

    textStyleForm: {
        color: 'color-basic-600'
    }
});

export default Signin;
