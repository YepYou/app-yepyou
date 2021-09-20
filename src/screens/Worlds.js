import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  Avatar,
  Button,
  Card,
  Layout,
  List,
  Modal,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';

import {Image, TouchableOpacity} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import Header from '../components/Header';
import Loading from '../components/Loading';
import NoDataFound from '../components/NoDataFound';
import WithoutConnection from '../components/WithoutConnection';

import api from '../services/api';
import config from '../config';
import colors from '../styles/palette.json';

const World = () => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const [loading, setLoading] = useState(false);
  const [worlds, setWorlds] = useState([]);
  const [haveConnetion, setHaveConnection] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    getWorlds();
  }, []);

  async function loadMoreWorlds() {
    if (worlds.length <= totalPages) {
      try {
        setPage((oldPage) => oldPage + 1);
        const {data: worldsData} = await api.get(
          `/v1/worlds?status=true&page=${page}`,
        );

        setWorlds([...worlds, worldsData]);
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
      const {data: worldsData} = await api.get('/v1/worlds?status=true');

      setTotalPages(worldsData.totalPages);
      setWorlds(worldsData.docs);
    } else {
      setHaveConnection(false);
    }

    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

  if (!haveConnetion) {
    return <WithoutConnection getData={getWorlds} />;
  }

  if (!worlds) {
    return <NoDataFound getData={getWorlds} />;
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.cardWorld}
        onPress={() => {
          if (item.plan === config.plan.free) {
            if (item && item.plan == config.plan.free) {
              navigation.navigate('Missions', {world: item});
            }
          } else {
            setModalVisible(true);
          }
        }}>
        <Image style={styles.cardWorldImage} source={{uri: `${item.url}`}} />
        {item.plan !== config.plan.free && (
          <Avatar
            style={styles.cardWorldAvatar}
            source={require('../../assets/padlock.png')}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header title="Mundos" />

      <Layout style={styles.container}>
        <Modal backdropStyle={styles.backdropModal} visible={modalVisible}>
          <Card disabled={true}>
            <Text>Olá Yepper!!! {`\n`}</Text>

            <Text>
              Para embarcar nesta viagem você vai precisar de uma conta Premium!
              🚀
            </Text>

            <Text>{`\n`}</Text>

            <Button onPress={() => setModalVisible(false)}>Voltar</Button>
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
    </>
  );
};

const themedStyles = StyleService.create({
  backdropModal: {
    backgroundColor: colors.backdropModal,
    width: '85%',
  },

  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  list: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors.backgroundScreen,
  },

  cardWorld: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },

  cardWorldImage: {
    width: '95%',
    height: 160,
    borderRadius: 14,
  },

  cardWorldAvatar: {
    bottom: 10,
    position: 'absolute',
    right: 25,
  },
});

export default World;
