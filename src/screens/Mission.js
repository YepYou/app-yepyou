import React from 'react';

import { Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components';

import Header from '../components/Header';
import colors from '../styles/palette.json';

const Mission = () => {
    const styles = useStyleSheet(themedStyles);

    return (
        <>
            <Header title="Uma Missão" />

            <Layout style={styles.container} >
               <Text>Isso é uma missão</Text>
            </Layout>
        </>
    );
};

const themedStyles = StyleService.create({
    backdropModal: {
        backgroundColor: colors.backdropModal
    },
    
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
        paddingHorizontal: 32,
	},

    list: {
		flex: 1,
		height: '100%',
		width: '100%',
        backgroundColor: colors.backgroundScreen
	},

    cardWorld: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20
    },

    cardWorldImage: {
        width: '95%',
        height: 160,
        borderRadius: 14
    },

    cardWorldAvatar: {
        bottom: 10,
        position: 'absolute',
        right: 25
    }
});

export default Mission;