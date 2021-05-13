import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Icon, Layout, List, Modal, Text } from '@ui-kitten/components';

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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [visible, setVisible] = React.useState(false);


    useEffect(() => {
        getWorlds();
    }, []);

    useEffect(() => {
        if (world && world.plan === config.plan.free) {
            console.log(world.plan);
        }
    }, [world]);

    async function loadMoreWorlds() {
		if (worlds.length <= totalPages) {
            try {
                setPage(oldPage => oldPage + 1);
                const { data: worldsData } = await api.get(`/v1/worlds?page=${page}`);

                setWorlds([...worlds, worldsData])
            } catch (e) {
                console.log(e);
            }
        }
    }

    async function getWorlds() {
        setLoading(true);

        const netinfo = await NetInfo.fetch();

        if (netinfo.isConnected) {
            setHaveConnection(true);
            const { data: worldsData } = await api.get('/v1/worlds');
            
            setTotalPages(worldsData.totalPages);
            setWorlds(worldsData.docs);
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
            <TouchableOpacity style={styles.cardWorld} onPress={() => {
                if (item.plan === config.plan.free) {
                    setWorld(item);
                } else {
                    setVisible(true);
                }
            }}>
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
        <Layout style={styles.container} >
            <Modal visible={visible}>
                <Card disabled={true}>
                    <Text>Olá explorador!!! {`\n`}</Text>
                    
                    <Text>Para acessar este mundo você vai precisar de uma conta Premium! 🚀</Text>
                    
                    <Text>{`\n`}</Text>

                    <Button onPress={() => setVisible(false)}>
                        Voltar
                    </Button>
                </Card>
            </Modal>

            <List 
                refreshing={false}
                style={styles.list}
                data={worlds} 
                renderItem={renderItem}
                onRefresh={() => getWorlds()}
                onEndReachedThreshold={0.1}
				onEndReached={loadMoreWorlds}
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

    list: {
		flex: 1,
		height: '100%',
		width: '100%'
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