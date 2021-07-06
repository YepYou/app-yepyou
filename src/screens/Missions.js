import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { Avatar, Button, Card, Layout, List, Modal, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { Bar } from 'react-native-progress';
import NetInfo from "@react-native-community/netinfo";
import Balloon from "react-native-balloon";

import AuthContext from '../context/AuthContext';

import WithoutConnection from '../components/WithoutConnection';
import NoDataFound from '../components/NoDataFound';
import Loading from '../components/Loading';
import Header from '../components/Header';

import api from '../services/api';
import config from '../config';
import colors from '../styles/palette.json';

import imagePersonagem from '../../assets/peronsagem1.png';
import imageInsinia from '../../assets/insignia-hide.png';

const Missions = () => {
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [missions, setMissions] = useState([]);
    const [mission, setMission] = useState(null);
    const [haveConnetion, setHaveConnection] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [modalVisible, setModalVisible] = React.useState(false);

    const route = useRoute();
    const navigation = useNavigation();

    const styles = useStyleSheet(themedStyles);

    useEffect(() => {
        getMissions();
    }, []);

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

            const { data: missionsData } = await api.get(`/v1/missions?active=true&user=${user.storageUser.id}&world=${route.params.world._id}`);
            
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
                    setLoading(true);
                    setMission(item);
                    api.post('/v1/UserMissionLog/create', 
                        {   
                            user: user.id, 
                            mission: item._id
                        }
                    );
                    setLoading(false);
                    navigation.navigate('MissionStack', { mission: item });
                } else {
                    setModalVisible(true);
                }
            }}>
                <Layout style={styles.cardMissionBlock}>
                    <Image 
                        resizeMode="cover"
                        style={styles.cardMissionBlockImage} 
                        source={{ uri: `${item.url}` }} 
                    />
                    
                    <Image 
                        resizeMode="contain"
                        source={item.dateFinished ? { uri: `${item.insigniaUrl}` } : imageInsinia} 
                        style={styles.cardMissionBlockInsignia}
                    />
                        
                    {item.plan !== config.plan.free &&
                        <Avatar 
                            style={styles.cardMissionAvatar} 
                            source={require('../../assets/padlock.png')}
                        />
                    }
                </Layout>

                <Layout style={styles.cardMissionBlockContent}>
                    <Layout style={styles.cardMissionBlockContentBar}>
                        <Text style={styles.cardMissionBlockContentBarText}>Envolvimento dos pais</Text>
                        <Bar 
                            style={styles.cardMissionBlockContentBarProgress}
                            progress={(item.parentInvolvement * 2) / 10} 
                            width={150} 
                            color={colors.barColorPurple}
                        />
                    </Layout>

                    <Layout style={styles.cardMissionBlockContentBar}>
                        <Text style={styles.cardMissionBlockContentBarText}>Materiais</Text>
                        <Bar 
                            style={styles.cardMissionBlockContentBarProgress}
                            progress={(item.materialUse * 2) / 10} 
                            width={150} 
                            color={colors.barColorBlue}
                        />
                    </Layout>

                    <Layout style={styles.cardMissionBlockContentBar}>
                        <Text style={styles.cardMissionBlockContentBarText}>Desafio</Text>
                        <Bar 
                            style={styles.cardMissionBlockContentBarProgress}
                            progress={(item.difficulty * 2) / 10}  
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
            <Header title="Missões" goBack />
            
            <Layout style={styles.header}>
                <Layout style={styles.headerBlock}>
                    <Image resizeMode="contain" style={styles.headerImage} source={imagePersonagem} />
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

            <Layout style={styles.container} >
                <Modal backdropStyle={styles.backdropModal} visible={modalVisible}>
                    <Card disabled={true}>
                        <Text>Olá Yepper!!! {`\n`}</Text>
                        
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
        backgroundColor: colors.backdropModal,
        width: '85%',
    },

	container: {
		flex: 1
	},

    header: {
        flexDirection: 'row',
        justifyContent: 'center'
	},

    headerBlock: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        top: -35,
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
		flex: 1
	},

    cardMission: {
        marginTop: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginBottom: 30
    },

    cardMissionBlock: {
        flex:1,
        width: '100%',
        height: Dimensions.get('window').width / 3
    },

    cardMissionBlockImage: {
        borderRadius: 15,
        width: '100%',
        height: Dimensions.get('window').width / 3
    },

    cardMissionBlockInsignia:{
        position: 'absolute',
        width: 60,
        height: 60,
        left: -10,
        top: -25
    },

    cardMissionBlockInsigniaGray:{
        position: 'absolute',
        width: 60,
        height: 60,
        left: -10,
        top: -25
    },

    cardMissionBlockContent: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardMissionBlockContentBar: {
        marginBottom: 10
    },

    cardMissionBlockContentBarText: {
        fontSize: 11,
        textTransform: 'uppercase',
        color: colors.headerTitle
    },

    cardMissionAvatar: {
        position: 'absolute',
        right: 5,
        bottom: 5
    }
});

export default Missions;