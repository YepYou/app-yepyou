import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/palette.json';
import backButtom from '../../assets/backButtom.png';

const Header = ({ title, goBack, translucent }) => {
    const styles = useStyleSheet(themedStyles);
    const navigation = useNavigation();

    return (
        <Layout style={[styles.container, {
            position: translucent ? 'absolute' : 'relative',
            backgroundColor: translucent ? 'transparent' : colors.secundary,
            zIndex: translucent ? 999 : 0,
            height: translucent ? 64 : 120,
        }]}>
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
        top: Dimensions.get('window').height / 19
    },

    backButtomIcon: {
        width: 30,
        height: 20
    },
    
	container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        top: 0,
	},

    text: {
        color: colors.headerText,
        fontSize: 36,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

export default Header;