import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Icon, Layout, List, Text } from '@ui-kitten/components';

import { StyleSheet } from 'react-native';
import Loading from '../components/Loading';
import NetInfo from "@react-native-community/netinfo";

import api from '../services/api';
import config from '../config';

const World = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [worlds, setWorlds] = useState([]);
    const [haveConnetion, setHaveConnection] = useState(true);

    useEffect(() => {
        getWorlds();
    }, []);

    async function getWorlds() {
        setLoading(true);

        const netinfo = await NetInfo.fetch();

        if (netinfo.isConnected) {
            setHaveConnection(true);
            // const { data: worlds } = await api.get('/v1/worlds');
            setWorlds(null);
        } else {
            setHaveConnection(false);
        }

        setLoading(false);
    }

    if (loading) {
        return <Loading />
    }

    if (!haveConnetion) {
        return(
            <Layout style={styles.container}>
                <Icon
                    style={styles.icon}
                    fill='#ddd'
                    name='wifi-off-outline'
                />
                <Text style={styles.noConnectionText} appearance='hint' category='h4'>
                    Without connection
                </Text>
                <Button style={styles.noConnectionButton} onPress={getWorlds}>
                    Try again
                </Button>
            </Layout>
        );
    }

    if (!worlds) {
        return (
            <Layout style={styles.container}>
                <Text category='h4'>No data found :(</Text>
            </Layout>
        );
    }

    const renderItem = (info) => {
        return(
            <Card status='basic' onPress={() => navigation.navigate('Enterprise', info.item)}>
                <Layout style={styles.cardItem}>
                    <Avatar style={styles.cardItemAvatar} source={{ uri: `${config.api.urlBase}/${info.item.photo}` }} />
                    <Layout style={styles.cardItemDescription}>
                        <Text>{info.item.enterprise_name}</Text>
                        <Text appearance="hint">
                            {info.item.enterprise_type.enterprise_type_name} - <Text appearance="hint">{info.item.city} - {info.item.country}</Text>
                        </Text>
                        <Text appearance="hint">$ {info.item.share_price}</Text>
                    </Layout>
                </Layout>
            </Card>
        );
    };

    return (
        <Layout>
            <List
                style={styles.list}
                data={worlds}
                renderItem={renderItem}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},

    cardItem: {
        flexDirection: 'row'
    },

    cardItemAvatar: {
        marginTop: 10
    },

    cardItemDescription: {
        paddingLeft: 20,
        flexDirection: 'column'
    },

    icon: {
        width: 76,
        height: 76,
        marginBottom: 12,
    },

    noConnectionButton: {
        marginTop: 12
    },

    noConnectionText: {
        color: '#ddd'
    },

    search: {
        margin: 6
    }
});

export default World;