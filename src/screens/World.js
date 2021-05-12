import React, { useEffect, useState } from 'react';
import { Avatar, Button, Icon, Layout, List, Text } from '@ui-kitten/components';

import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Loading from '../components/Loading';
import NetInfo from "@react-native-community/netinfo";

import api from '../services/api';
import config from '../config';

const World = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [worlds, setWorlds] = useState([]);
    const [world, setWorld] = useState(null);
    const [haveConnetion, setHaveConnection] = useState(true);

    useEffect(() => {
        getWorlds();
    }, []);

    useEffect(() => {
        if (world.plan === config.plan.free) {
            console.log(world.plan);
        }
    }, [world]);

    async function getWorlds() {
        setLoading(true);

        const netinfo = await NetInfo.fetch();

        if (netinfo.isConnected) {
            setHaveConnection(true);
            const { data: worlds } = await api.get('/v1/worlds');
            
            setWorlds(worlds.docs);
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

    const renderItem = ({ item }) => {
        return(
            <TouchableOpacity style={styles.cardWorld} onPress={() => setWorld(item)}>
                {item.plan === config.plan.free ?
                    <Image style={styles.cardWorldImage} source={{ uri: `${item.url}` }} />
                :
                    <>
                        <Image style={[styles.cardWorldImage, styles.cardWorldImagePremium]} source={{ uri: `${item.url}` }} />
                        <Avatar style={styles.cardWorldAvatar} source={require('../../assets/padlock.png')}/>
                    </>
                }
            </TouchableOpacity>
        );
    };

    return (
        <Layout>
            <List data={worlds} renderItem={renderItem} />
        </Layout>
    );
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
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

    cardWorldImagePremium: {
        opacity: 0.5
    },

    cardWorldAvatar: {
        bottom: 10,
        position: 'absolute',
        right: 25
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
    }
});

export default World;