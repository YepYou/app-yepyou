import React, { useEffect } from 'react';
import { Dimensions, Image, ImageBackground } from 'react-native';
import { Button, CalendarViewModes, Datepicker, Layout, Input, StyleService, Text, useStyleSheet } from '@ui-kitten/components';

import * as ScreenOrientation from 'expo-screen-orientation';

import bgLoginScreen from '../assets/bgLoginScreen.png';
import logoIcon from '../assets/loginIcon.png';

import DatePickerPlaceholder from '../src/components/DatePickerPlaceholder';
  
export const Login = () => {
    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState();
    
    const now = new Date();
    const min = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 43800);

    const datepickerBirthDate = React.useRef();

    const styles = useStyleSheet(themedStyles);

    useEffect(() => {
        configScreen();

        async function configScreen() {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    });

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
                    label='NOME'
                    onChangeText={nextValue => setName(nextValue)}
                />

                <Datepicker
                    textStyle={styles.textStyleForm}
                    ref={datepickerBirthDate}
                    controlStyle={styles.pickerControl}
                    style={styles.picker}
                    label="DATA DE NASCIMENTO"
                    date={date}
                    min={min}
                    startView={CalendarViewModes.YEAR}
                    placeholder={() => <DatePickerPlaceholder text="Teste" />}
                    onSelect={nextDate => setDate(nextDate)}
                />

                <Button
                    status="success"
                    style={styles.button}
                    onPress={() => console.log('entrou')}>
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
        flex:1,
        alignItems: "center"
    },

    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get('window').height * 0.6
    },

    headerBgImage: {
        resizeMode: "stretch",
        width: "100%",
        flex: 1,
    },

    headerImage: {
        flex:1,
        position: "absolute",
        justifyContent: "center",
        resizeMode: "contain",
        top: 50,
        width: 150,
        left: Dimensions.get('window').width * 0.3
    },

    input: {
        borderRadius: 45,
        paddingHorizontal: 35,
        paddingVertical: 10,
        backgroundColor: "color-primary-default"
    },

    button: {
        borderRadius: 45,
        marginTop: 40,
        width: 140
    },

    picker: {
        width: "100%",
        paddingHorizontal: 35,
        paddingVertical: 10
    },

    pickerControl: {
        borderRadius: 45,
        backgroundColor: 'color-primary-default'
    },

    textStyleForm: {
        color: "color-basic-600"
    }
});