import React from 'react';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { ScrollView } from 'react-native';

import Header from '../components/Header';
import colors from '../styles/palette.json';

const Mission = () => {
    const styles = useStyleSheet(themedStyles);

    return (
        <>
            <Header goBack />
            <ScrollView
                style={styles.container}
                contentContainerStyle={{alignItems: 'center'}}>
                <Title text="Isso é um título" />
                <Subtitle text="Escute o áudio abaixo e entenda quais serão nossos próximos passos para essa grande descoberta:" />
                <Img url={mission.url} />
                <Img url="https://cdn.mensagenscomamor.com/content/images/m000134490.jpg" />
                <Text>Isso é uma missão</Text>
            </ScrollView>
        </>
    );
};

const themedStyles = StyleService.create({
    backdropModal: {
        backgroundColor: colors.backdropModal
    },
    
	container: {
        paddingHorizontal: 16,
        width: '100%',
        flex: 1
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