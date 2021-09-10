import React, {useState, useRef, useEffect, useContext} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Animated, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import {Audio} from 'expo-av';
import * as FileSystem from 'expo-file-system';
import {
  Modal,
  Text,
  Layout,
  Button as UIButton,
  Card,
} from '@ui-kitten/components';

import imageIcon from '../../assets/image.png';
import microphoneIcon from '../../assets/microphone.png';
import textIcon from '../../assets/text.png';
import cancelIcon from '../../assets/cancel.png';
import sendIcon from '../../assets/send.png';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const NoteCreator = ({mission, onSendContent}) => {
  const {user} = useContext(AuthContext);

  const [sendingImage, setSendingImage] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [recording, setRecording] = useState(null);
  const [typingText, setTypingText] = useState(false);
  const [text, setText] = useState('');
  const [sendingText, setSendingText] = useState(false);
  const [sendingAudio, setSendingAudio] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const springValue = useRef(new Animated.Value(0)).current;

  const colors = {
    image: '#DB2C80',
    audio: '#3B90C5',
    text: '#561791',
  };

  const pickImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });

    if (!pickedImage.cancelled) {
      sendImage(pickedImage);
    }
  };

  const sendText = async () => {
    setSendingText(true);

    try {
      await api.post('/v1/yepboards', {
        mission: mission._id,
        user: user.id,
        type: 'text',
        content: text,
      });

      onSendContent();
    } catch (e) {
      console.log(e);
    }

    setText('');
    setSendingText(false);
    setTypingText(false);
  };

  const sendImage = async (image) => {
    setSendingImage(true);

    try {
      await api.post('v1/yepboards', {
        mission: mission._id,
        user: user.id,
        type: 'image',
        file: `data:image/jpeg;base64,${image.base64}`,
      });

      onSendContent();
    } catch (error) {
      console.log(error);

      if (error.message.includes('413')) {
        setShowErrorModal(true);
      }
    }

    setSendingImage(false);
  };

  const startRecordingAudio = async () => {
    const recording = new Audio.Recording();

    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      await recording.prepareToRecordAsync({
        isMeteringEnabled: true,
        android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.caf',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });
      await recording.startAsync();

      setRecordingAudio(true);
      setRecording(recording);
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecordingAudio = async (cancelled = false) => {
    await recording.stopAndUnloadAsync();

    setRecordingAudio(false);

    if (!cancelled) {
      sendAudio(recording);
    }

    setRecording(null);
  };

  const sendAudio = async (audio) => {
    setSendingAudio(true);

    try {
      const data = await FileSystem.readAsStringAsync(audio.getURI(), {
        encoding: FileSystem.EncodingType.Base64,
      });

      await api.post('v1/yepboards', {
        mission: mission._id,
        user: user.id,
        type: 'audio',
        file: `data:audio/${
          Platform.OS === 'android' ? 'm4a' : 'caf'
        };base64,${data}`,
      });

      onSendContent();
    } catch (error) {
      console.log(error);

      if (error.message.includes('413')) {
        setShowErrorModal(true);
      }
    }

    setSendingAudio(false);
  };

  const fadeInAndOutAnimation = Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 0.6,
      duration: 750,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 750,
      useNativeDriver: true,
    }),
  ]);

  useEffect(() => {
    if (recordingAudio) {
      Animated.loop(
        Animated.parallel([
          fadeInAndOutAnimation,
          Animated.timing(springValue, {
            toValue: 0.6,
            friction: 3,
            tension: 40,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [recordingAudio]);

  return (
    <>
      <Container height={typingText ? 200 : 60}>
        <Actions>
          {typingText ||
            (recordingAudio && (
              <Button
                color="#00000055"
                onPress={() => {
                  setTypingText(false);
                  stopRecordingAudio(true);
                }}>
                <ButtonImage resizeMode="contain" source={cancelIcon} />
              </Button>
            ))}
          {!typingText && !recordingAudio && (
            <Button
              disabled={
                sendingImage || recordingAudio || sendingText || sendingAudio
              }
              color={colors.image}
              onPress={pickImage}>
              <ButtonImage resizeMode="contain" source={imageIcon} />
            </Button>
          )}
          {!typingText && (
            <Button
              disabled={sendingImage || sendingText || sendingAudio}
              color={colors.audio}
              onPress={() =>
                recordingAudio ? stopRecordingAudio() : startRecordingAudio()
              }>
              <ButtonImage
                resizeMode="contain"
                source={recordingAudio ? sendIcon : microphoneIcon}
              />
            </Button>
          )}
          {!recordingAudio && (
            <Button
              disabled={
                sendingImage || recordingAudio || sendingText || sendingAudio
              }
              color={colors.text}
              onPress={() => (typingText ? sendText() : setTypingText(true))}>
              <ButtonImage
                resizeMode="contain"
                source={typingText ? sendIcon : textIcon}
              />
            </Button>
          )}
        </Actions>
        <Content flex={typingText ? 5 : 1}>
          {!typingText ? (
            <Placeholder>
              {sendingImage && 'Enviando imagem...'}
              {sendingText && 'Enviando texto...'}
              {recordingAudio && 'Gravando áudio...'}
              {sendingAudio && 'Enviando áudio...'}
              {!sendingImage &&
                !sendingText &&
                !recordingAudio &&
                !sendingAudio &&
                'Crie uma nota...'}
            </Placeholder>
          ) : (
            <TextInput
              multiline
              placeholder="Digite o texto de sua nota..."
              value={text}
              onChangeText={setText}
            />
          )}
          {(sendingImage || sendingText || sendingAudio) && (
            <ActivityIndicator color={colors.image} />
          )}
          {recordingAudio && (
            <Animated.View
              style={{
                opacity: fadeAnim,
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'red',
              }}
            />
          )}
        </Content>
      </Container>
      <ErrorModal visible={showErrorModal}>
        <Card disabled={true}>
          <Text>
            Você está enviando um arquivo muito grande, tente enviar um arquivo
            de até 50mb
          </Text>
          <Text>{`\n`}</Text>
          <ErrorModalActions>
            <UIButton
              appearance="ghost"
              onPress={() => setShowErrorModal(false)}>
              OK
            </UIButton>
          </ErrorModalActions>
        </Card>
      </ErrorModal>
    </>
  );
};

const Container = styled.View`
  width: 100%;
  height: 60px;
  border-radius: 30px;
  background-color: #dbdbdb;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
`;

const Content = styled.View`
  flex: ${({flex}) => flex};
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Actions = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${({color}) => color};
  border-radius: 20px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

const ButtonImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const Placeholder = styled.Text`
  color: #919190;
`;

const TextInput = styled.TextInput``;

const ErrorModal = styled(Modal)`
  width: 85%;
`;

const ErrorModalActions = styled(Layout)`
  flex-direction: row;
  width: 100%;
`;

export default NoteCreator;
