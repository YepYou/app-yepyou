import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Icon, Layout, List, Modal, Text } from '@ui-kitten/components';

import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import WithoutConnection from '../components/WithoutConnection';
import Loading from '../components/Loading';

import api from '../services/api';
import config from '../config';

const Missions = () => {
    const [loading, setLoading] = useState(false);
    const [missions, setMissions] = useState([]);
    const [mission, setMission] = useState(null);
    const [haveConnetion, setHaveConnection] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [modalVisible, setModalVisible] = React.useState(false);

    useEffect(() => {
        getMissions();
    }, []);

    useEffect(() => {
        if (mission && mission.plan === config.plan.free) {
            console.log(mission.plan);
        }
    }, [mission]);

    async function loadMoreMissions() {
		if (missions.length <= totalPages) {
            try {
                setPage(oldPage => oldPage + 1);
                const { data: missionsData } = await api.get(`/v1/missions?page=${page}`);

                setMissions([...mission, missionsData])
            } catch (e) {
                console.log(e);
            }
        }
    }

    async function getMissions() {
        setLoading(true);

        const netinfo = await NetInfo.fetch();

        if (!netinfo.isConnected) {
            setHaveConnection(true);
            const { data: missionsData } = await api.get('/v1/missions');
            
            setTotalPages(missionsData.totalPages);
            setMissions(missionsData.docs);
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
            <WithoutConnection getData={getMissions} />
        );
    }

    if (!missions) {
        return (
            <Layout style={styles.container}>
                <Text category='h4'>No data found :(</Text>
            </Layout>
        );
    }

    const renderItem = ({ item }) => {
        return(
            <TouchableOpacity style={styles.cardMission} onPress={() => {
                if (item.plan === config.plan.free) {
                    setMission(item);
                } else {
                    setModalVisible(true);
                }
            }}>
                {item.plan === config.plan.free ?
                    <Image style={styles.cardMissionImage} source={{ uri: `${item.url}` }} />
                :
                    <>
                        <Image 
                            style={[styles.cardMissionImage, styles.cardMissionImagePremium]} 
                            source={{ uri: `${item.url}` }} 
                        />
                        <Avatar 
                            style={styles.cardMissionAvatar} 
                            source={require('../../assets/padlock.png')}
                        />
                    </>
                }
            </TouchableOpacity>
        );
    };

    return (
        <Layout style={styles.container} >
            <Modal visible={modalVisible}>
                <Card disabled={true}>
                    <Text>Olá explorador!!! {`\n`}</Text>
                    
                    <Text>Para aceitar esta missão você vai precisar de uma conta Premium! 🚀</Text>
                    
                    <Text>{`\n`}</Text>

                    <Button onPress={() => setModalVisible(false)}>
                        Voltar
                    </Button>
                </Card>
            </Modal>

            <List 
                refreshing={false}
                style={styles.list}
                data={missions} 
                renderItem={renderItem}
                onRefresh={() => getMissions()}
                onEndReachedThreshold={0.1}
				onEndReached={loadMoreMissions}
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

    cardMission: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20
    },

    cardMissionImage: {
        width: '95%',
        height: 160,
        borderRadius: 14
    },

    cardMissionImagePremium: {
        opacity: 0.5
    },

    cardMissionAvatar: {
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

export default Missions;