import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
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
        top: Dimensions.get('window').height / 45
    },

    backButtomIcon: {
        width: 30,
        height: 20
    },
    
	container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'color-info-500',
        height: Dimensions.get('window').height / 5,
        width: "100%"
	},

    text: {
        color: colors.headerText,
        fontSize: 36,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

export default Header;