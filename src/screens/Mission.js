import React, {useState, useContext, useRef} from 'react';
import {
  StyleService,
  Text,
  useStyleSheet,
  Modal,
  Button,
  Layout,
  Card,
} from '@ui-kitten/components';
import {ScrollView, TouchableOpacity} from 'react-native';

import Header from '../components/Header';
import {
  Title,
  Subtitle,
  Img,
  Dialogue,
  PlayAudio,
  Video,
} from '../components/contents';
import colors from '../styles/palette.json';
import config from '../config';
import {StageTitle} from '../components';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import MissionContext from '../context/MissionContext';

const Mission = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const {finish} = useContext(MissionContext);

  const [stage, setStage] = useState(1);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);
  const styles = useStyleSheet(themedStyles);

  const {mission} = route.params;

  const scroll = useRef();

  const renderContent = () => {
    const {contents} = mission.stages[stage - 1] || [];

    return contents.map((content) => {
      switch (content.type) {
        case config.contentTypes.title:
          return <Title text={content.textContent} />;
        case config.contentTypes.subTitle:
          return <Subtitle text={content.textContent} />;
        case config.contentTypes.text:
          return <Dialogue text={content.textContent} url={content.url} />;
        case config.contentTypes.image:
          return <Img url={content.url} />;
        case config.contentTypes.audio:
          return <PlayAudio url={content.url} />;
        case config.contentTypes.video:
          return <Video url={content.textContent} />;
        default:
          return null;
      }
    });
  };

  const finishMission = async () => {
    setFinishLoading(true);

    try {
      await api.put(`/v1/UserMissionLog/endMission`, {
        user: user.id,
        mission: mission._id,
      });
      setShowFinishModal(false);
      navigation.pop(2);
    } catch (e) {
      console.log(e);
    }

    finish();
  };

  const nextStep = () => {
    mission.stages.length === stage
      ? setShowFinishModal(true)
      : setStage(stage + 1);
  };

  return (
    <>
      {stage > 1 ? (
        <Header
          onStageBack={() => {
            setStage(stage - 1);
            scroll.current.scrollTo();
          }}
          stageProgress={(stage * 100) / mission.stages.length}
        />
      ) : (
        <Header goBack stageProgress={(stage * 100) / mission.stages.length} />
      )}
      <ScrollView
        ref={scroll}
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        {mission.stages[stage - 1] && (
          <StageTitle text={mission.stages[stage - 1].name} />
        )}
        {renderContent()}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            scroll.current.scrollTo();
            nextStep();
          }}>
          <Text style={styles.buttonText}>
            {mission.stages.length === stage
              ? 'Finalizar miss??o'
              : 'Pr??xima etapa'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal style={styles.modal} visible={showFinishModal}>
        <Card disabled={true}>
          <Text>Parab??ns!!! {`\n`}</Text>

          <Text>Voc?? finalizou essa miss??o</Text>

          <Text>{`\n`}</Text>

          <Layout style={styles.modalActions}>
            <Button
              loading={finishLoading}
              style={{flex: 1}}
              onPress={() => finishMission()}>
              Continuar
            </Button>
          </Layout>
        </Card>
      </Modal>
    </>
  );
};

const themedStyles = StyleService.create({
  backdropModal: {
    backgroundColor: colors.backdropModal,
  },

  container: {
    paddingHorizontal: 16,
    width: '100%',
    flex: 1,
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

  button: {
    backgroundColor: colors.barColorPink,
    borderRadius: 10,
    width: 130,
    height: 35,
    bottom: 20,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
  },

  modal: {
    width: '85%',
  },

  modalActions: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default Mission;
