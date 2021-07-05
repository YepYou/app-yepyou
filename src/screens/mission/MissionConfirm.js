import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import { Avatar, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components';

import { Image, View, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import WithoutConnection from '../../components/WithoutConnection';

import api from '../../services/api';
import colors from '../../styles/palette.json';

import missionBottle from '../../../assets/mission-bottle.png';

import timer from '../../../assets/timer.png';

import manOn from '../../../assets/man-on.png';
import manOff from '../../../assets/man-off.png';

import boxOn from '../../../assets/box-on.png';
import boxOff from '../../../assets/box-off.png';

import checkOn from '../../../assets/check-on.png';
import checkOff from '../../../assets/check-off.png';

import AuthContext from '../../context/AuthContext';

const MissionBottleImage = (props) => (
    <Image resizeMode="contain" {...props} source={missionBottle}/>
);

const MissionConfirm = ({mission}) => {
    const { user } = useContext(AuthContext);

    const navigation = useNavigation();
    const route = useRoute();

    const styles = useStyleSheet(themedStyles);

    const [loading, setLoading] = useState(false);
    const [haveConnetion, setHaveConnection] = useState(true);

    let thematicAreas = mission.thematicArea.split(",");

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

    async function acceptMission() {
        setLoading(true);

        const netinfo = await NetInfo.fetch();

        if (netinfo.isConnected) {
            setHaveConnection(true);
            api.put('/v1/UserMissionLog/startMission', 
                {   
                    user: user.storageUser.id, 
                    mission
                }
            );
            
            setLoading(false);

            navigation.navigate('Mission');   
        } else {
            setHaveConnection(false);
        }

        setLoading(false);
    }
    
    if (loading) {
        return <Loading />
    }

    if (!haveConnetion) {
        return <WithoutConnection getData={getWorlds} />;
    }

    return (
        <>
            <Header title={mission.name} goBack />

            <Layout style={styles.container} >
                <Layout style={styles.missionHeader}> 
                    <Image style={styles.missionImage} source={{ uri: `${mission.url}` }} />
                    <MissionBottleImage style={styles.missionAvatar} />
                </Layout>

                <Layout style={styles.missionDetails} >
                    <View style={styles.missionDetailsRow} >
                       <View style={styles.missionDetailsRowContent}>
                            <View style={styles.missionDetailsRowTitle}>
                                <Text style={styles.missionDetailsRowTitleText}>Envolvimento dos pais</Text>
                            </View>
                            <View style={styles.iconsWrapper}>
                                {
                                    [...Array(5)].map((x, i) => {
                                        return <Image style={styles.avatarPoints} key={i} source={ mission.parentInvolvement > i ? manOn : manOff}/>
                                    })
                                } 
                            </View>
                       </View>
                       <View style={styles.missionDetailsRowContent}>
                            <View style={styles.missionDetailsRowTitle}>
                                <Text style={styles.missionDetailsRowTitleText}>Tempo estimado</Text>
                            </View>
                            <View style={styles.estimatedTimeWrapper} >
                                <Avatar style={styles.avatarNotes} source={timer}/>

                                <Text style={styles.estimatedTimeText}>
                                    { moment.duration(mission.estimatedTime, "minutes").hours() > 0 &&
                                        ` ${moment.duration(mission.estimatedTime, "minutes").hours()}h` 
                                    }
                                    {moment.duration(mission.estimatedTime, "minutes").minutes()}min
                                </Text>
                            </View>
                       </View>
                    </View>

                    <View style={styles.missionDetailsRow} >
                       <View style={styles.missionDetailsRowContent}>
                            <View style={styles.missionDetailsRowTitle}>
                                <Text style={styles.missionDetailsRowTitleText}>Uso de materiais</Text>
                            </View>
                            <View style={styles.iconsWrapper}>
                                {
                                    [...Array(5)].map((x, i) => {
                                        return <Image style={styles.avatarPoints} key={i} source={ mission.materialUse > i ? boxOn : boxOff}/>
                                    })
                                } 
                            </View>

                       </View>

                       <View style={styles.missionDetailsRowContent}>
                            <View style={styles.missionDetailsRowTitle}>
                                <Text style={styles.missionDetailsRowTitleText}>Desafio</Text>
                            </View>
                            <View style={styles.iconsWrapper}>
                                {
                                    [...Array(5)].map((x, i) => {
                                        return <Image style={styles.avatarPoints} key={i} source={ mission.difficulty > i ? checkOn : checkOff}/>
                                    })
                                } 
                            </View>
                       </View>
                    </View>

                    {thematicAreas && 
                        <View style={styles.missionDetailsRow} >
                            <View style={styles.missionDetailsRowContent}>
                                <View style={[styles.missionDetailsRowTitle, { width: '45%' }]}>
                                    <Text style={styles.missionDetailsRowTitleText}>Conceitos Científicos</Text>
                                </View>
                                <View style={[styles.tagsWrapper]}>
                                    {thematicAreas.map((tag, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={styles.tagContent}>
                                                <Text style={styles.tagText}>#{tag.trim()}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    }
                </Layout>
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={acceptMission}
                >
                    <Text style={styles.buttonText} >Iniciar</Text>
                </TouchableOpacity>
            </Layout>
        </>
    );
};

const themedStyles = StyleService.create({
	container: {
        width:'100%',
		alignItems: 'center',
		flex: 1
	},

    missionHeader: {
        width: '100%'
    },

    missionImage: {
        alignSelf: 'center',
        width: '70%',
        height: 150,
        borderRadius: 14,
        borderColor: colors.backgroundCardColor,
        borderWidth: 4,
        marginTop: 40,
    },

    missionAvatar: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: '10%',
        bottom: -10
    },

    missionDetails: {
        height: '50%',
        marginTop: 45,
        backgroundColor: colors.backgroundCardColor,
        alignItems: 'center',
        borderRadius: 18
    },

    missionDetailsRow: {
        marginTop: 15,
        flexDirection: 'row',
        marginBottom: 15,
        width: '90%'
    },

    missionDetailsRowContent: {
        flex: 1,
        paddingHorizontal: 15,
    },

    missionDetailsRowTitle: {
        backgroundColor: colors.barColorPink,
        borderRadius: 8,
    },
    
    missionDetailsRowTitleText: {
        paddingHorizontal: 10,
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
        height: 18
    },

    button: {
        backgroundColor: colors.barColorPink,
        borderRadius: 10,
        width: 130,
        height: 35,
        bottom: 20
    },

    buttonText: {
        color: '#fff',
        alignSelf: 'center',
        marginTop: 7
    },

    estimatedTimeWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },

    avatarPoints:{
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginLeft: 3
    },

    avatarNotes: {
        height: 24,
        width: 24
    },

    estimatedTimeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10
    },

    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5
    },

    tagContent: {
        backgroundColor: colors.backgroundTagColor,
        marginTop: 5,
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 5,
        marginRight: 5
    },

    tagText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 11
    },

    iconsWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center'
    },
});

export default MissionConfirm;