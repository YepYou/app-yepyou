import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const Loading = ({ getData }) => (
    <Layout style={styles.container}>
        <Icon
            style={styles.icon}
            fill='#ddd'
            name='wifi-off-outline'
        />
        <Text style={styles.noConnectionText} appearance='hint' category='h4'>
            Sem internet
        </Text>
        <Button status="info" style={styles.noConnectionButton} onPress={getData}>
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

    noConnectionButton: {
        marginTop: 50
    },

    noConnectionText: {
        color: '#ddd'
    }
});

export default Loading;