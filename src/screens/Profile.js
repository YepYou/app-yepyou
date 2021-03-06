import React, { useContext, useState } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Layout, StyleService, Text, useStyleSheet, Modal, Card, Button } from '@ui-kitten/components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../context/AuthContext';

import imageAvatarFrameProfile from '../../assets/avatarFrameProfile.png';
import imageLogoIcon from '../../assets/loginIcon.png';
import imageTestTube from '../../assets/testTube.png';

const Profile = ({screenIndex}) => {
    const navigation = useNavigation();
    const { signout: ctxSignout } = useContext(AuthContext);
    const styles = useStyleSheet(themedStyles);

    const [showBackModal, setShowBackModal] = useState(false);

    async function handleSignout() {
        await AsyncStorage.removeItem('@yepyou_user');

        ctxSignout();
    }

    return (
        <>
            <Layout style={styles.container}>
                <Image resizeMode="contain" style={styles.headerImage} source={imageAvatarFrameProfile} />

                <Layout style={styles.actionsList}>
                    <TouchableOpacity
                        style={styles.actionsListButton}
                        onPress={() => {
                            if (screenIndex === 1) {
                                setShowBackModal(true);
                            } else {
                                navigation.navigate('Worlds');
                            }
                        }}>
                        <Text style={styles.actionsListButtonText}>Mundos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionsListButton}
                        onPress={handleSignout}>
                        <Text style={styles.actionsListButtonText}>Sair</Text>
                    </TouchableOpacity>  
                </Layout>
                
                <Image resizeMode="contain" style={styles.logo} source={imageLogoIcon} />
            </Layout>
            <Image resizeMode="contain" style={styles.testTube} source={imageTestTube} />
            <Modal style={styles.modal} visible={showBackModal}>
                <Card disabled={true}>
                    <Text>Ol?? Yepper!!! {`\n`}</Text>
                    
                    <Text>Voc?? est?? em uma miss??o, deseja realmente voltar a lista de Mundos?</Text>
                    
                    <Text>{`\n`}</Text>

                    <Layout style={styles.modalActions}>
                        <Button appearance="ghost" style={{flex: 1}} onPress={() => {
                            setShowBackModal(false);
                            navigation.navigate('Worlds');
                        }}>
                            Sim
                        </Button>
                        <Button style={{flex: 1}} onPress={() => {
                            setShowBackModal(false);
                            navigation.goBack();
                        }}>
                            N??o
                        </Button>
                    </Layout>
                </Card>
            </Modal>
        </>
    );
};

const themedStyles = StyleService.create({
    actionsList: {
        backgroundColor: 'transparent',
        width: "100%",
        flex: 1
    },

    actionsList: {
        backgroundColor: 'transparent',
        flex:1,
        width: "90%"
    },

    actionsListButton: {
        backgroundColor: 'color-primary-500',
        borderRadius: 45,
        height: 50,
        marginBottom: 15,
    },

    actionsListButtonText: {
        color: '#fff',
        textTransform: 'uppercase',
        marginLeft: 60,
        marginTop: 20,
        fontWeight: 'bold',
        letterSpacing: 2
    },

	container: {
		alignItems: 'center',
		flex: 1,
        backgroundColor: 'color-info-500'
	},

    headerImage: {
        flex: 1,
        width: Dimensions.get('window').width / 2.5
    },

    logo: {
        flex:1,
        width: 100
    },

    modalActions: {
        flexDirection: 'row',
        width: '100%'
    },

    testTube: {
        position: 'absolute',
        width: Dimensions.get('window').width - 200,
        height: "100%",
        zIndex: 1,
        justifyContent: 'center',
        bottom: 50,
        right: -50
    },

    modal: {
        width: '85%',
    },
});

export default Profile;