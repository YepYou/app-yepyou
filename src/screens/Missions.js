import React, { useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Avatar, Button, Card, Layout, List, Modal, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { Bar } from 'react-native-progress';
import NetInfo from "@react-native-community/netinfo";
import Balloon from "react-native-balloon";

import WithoutConnection from '../components/WithoutConnection';
import NoDataFound from '../components/NoDataFound';
import Loading from '../components/Loading';
import Header from '../components/Header';

import api from '../services/api';
import config from '../config';
import colors from '../styles/palette.json';

import imagePersonagem from '../../assets/peronsagem1.png';

const Missions = () => {
    const [loading, setLoading] = useState(false);
    const [missions, setMissions] = useState([]);
    const [mission, setMission] = useState(null);
    const [haveConnetion, setHaveConnection] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [modalVisible, setModalVisible] = React.useState(false);

    const route = useRoute();
    const styles = useStyleSheet(themedStyles);

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

        if (netinfo.isConnected) {
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
        return <NoDataFound getData={getMissions} />;
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
                <Layout style={styles.cardMissionBlock}>
                    <Image 
                        style={styles.cardMissionBlockImage} 
                        source={{ uri: `${item.url}` }} 
                    />
                        
                    {item.plan !== config.plan.free &&
                        <Avatar 
                            style={styles.cardMissionAvatar} 
                            source={require('../../assets/padlock.png')}
                        />
                    }
                </Layout>
                <Layout 
                    style={[styles.cardMissionBlock, styles.cardMissionBlockContent]}
                >
                    <Layout style={styles.cardMissionBlockContentBar}>
                        <Text style={styles.cardMissionBlockContentBarText}>Tempo Estimado</Text>
                        <Bar 
                            style={styles.cardMissionBlockContentBarProgress}
                            progress={item.estimatedTime / 10} 
                            width={150} 
                            color={colors.barColorPurple}
                        />
                    </Layout>

                     <Layout style={styles.cardMissionBlockContentBar}>
                        <Text style={styles.cardMissionBlockContentBarText}>Materiais</Text>
                        <Bar 
                            style={styles.cardMissionBlockContentBarProgress}
                            progress={item.materialUse / 10} 
                            width={150} 
                            color={colors.barColorBlue}
                        />
                    </Layout>

                    <Layout style={styles.cardMissionBlockContentBar}>
                        <Text style={styles.cardMissionBlockContentBarText}>Dificuldade</Text>
                        <Bar 
                            style={styles.cardMissionBlockContentBarProgress}
                            progress={item.difficulty / 10}  
                            width={150} 
                            color={colors.barColorPink}
                        />
                    </Layout>
                </Layout>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <Header goBack />
            
            <Layout style={styles.header}>
                <Layout style={styles.headerBlock}>
                    <Image style={styles.headerImage} source={imagePersonagem} />
                    <Balloon
                        triangleOffset="26%"
                        borderColor="#CDCDCD"
                        backgroundColor="#CDCDCD"
                        triangleDirection="left"
                        borderRadius={20}
                        triangleSize={20}
                        containerStyle={styles.headerBalloon}
                        >
                        <Text style={styles.headerBalloonText} >
                            {route.params.world.name}
                        </Text>
                    </Balloon>
                </Layout>
            </Layout>

            <Layout>
                <Text category='h1' style={styles.headerText}>MISSÕES</Text>
            </Layout>

            <Layout style={styles.container} >
                <Modal backdropStyle={styles.backdropModal} visible={modalVisible}>
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
        </>
    );
};

const themedStyles = StyleService.create({
    backdropModal: {
        backgroundColor: colors.backdropModal
    },

	container: {
		flex: 1
	},

    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
	},

    headerBlock: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        top: -50,
    },

    headerBalloon: {
        marginLeft: 13,
        width: 200
    },

    headerBalloonText: {
        color: colors.headerTitle,
        fontSize: 16,
        fontWeight: 'bold'
    },

    headerText: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        color: colors.headerTitle,
        top: -30
	},

    headerImage: {
        left: Dimensions.get('window').width / 14,
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },

    list: {
        backgroundColor: colors.backgroundScreen,
		flex: 1,
		height: '100%',
		width: '100%'
	},

    cardMission: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 20
    },

    cardMissionBlock: {
        flex: 1,
    },

    cardMissionBlockImage: {
        borderRadius: 14,
        height: 180,
        width: 180,
    },

    cardMissionBlockContent: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardMissionBlockContentBar: {
        marginBottom: 20
    },

    cardMissionBlockContentBarText: {
        fontSize: 11,
        marginLeft: 10,
        textTransform: 'uppercase',
        color: colors.headerTitle
    },

    cardMissionAvatar: {
        bottom: 10,
        position: 'absolute',
        left: 130
    }
});

export default Missions;