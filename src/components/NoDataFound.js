import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const NoDataFound = ({ getData }) => (
    <Layout style={styles.container}>
        <Icon
            style={styles.icon}
            fill='#ddd'
            name='wifi-off-outline'
        />
        <Text style={styles.text} appearance='hint' category='h4'>
            Sem dados para exibir 🥲
        </Text>
        <Button status="info" style={styles.button} onPress={getData}>
            Tentar novamente 
        </Button>
    </Layout>
);

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},

    icon: {
        width: 76,
        height: 76,
        marginBottom: 12,
    },

    button: {
        marginTop: 50
    },

    text: {
        color: '#ddd'
    }
});

export default NoDataFound;