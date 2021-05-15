import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/palette.json';
import backButtom from '../../assets/backButtom.png';

const Header = ({ title, goBack }) => {
    const styles = useStyleSheet(themedStyles);
    const navigation = useNavigation();

    return (
        <Layout style={styles.container}>
            {goBack &&
                <TouchableOpacity style={styles.backButtom} onPress={() => navigation.goBack()}>
                    <Image style={styles.backButtomIcon} source={backButtom} />
                </TouchableOpacity>
            }
            <Text style={styles.text} >
                {title}
            </Text>
        </Layout>
    );
};

const themedStyles = StyleService.create({
    backButtom: {
        alignSelf: 'flex-start',
        left: 30,
        top: 50
    },

    backButtomIcon: {
        width: 30,
        height: 20
    },
    
	container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'color-primary-500',
        height: 170,
        width: "100%"
	},

    text: {
        marginTop: 70,
        color: colors.headerText,
        fontSize: 36,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

export default Header;