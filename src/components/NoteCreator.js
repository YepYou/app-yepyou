import React, {useState, useRef, useEffect, useContext} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Animated} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import imageIcon from '../../assets/image.png';
import microphoneIcon from '../../assets/microphone.png';
import textIcon from '../../assets/text.png';
import cancelIcon from '../../assets/cancel.png';
import sendIcon from '../../assets/send.png';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const NoteCreator = ({mission}) => {
  const {user} = useContext(AuthContext);

  const [sendingImage, setSendingImage] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [typingText, setTypingText] = useState(false);
  const [text, setText] = useState('');
  const [sendingText, setSendingText] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const springValue = useRef(new Animated.Value(0)).current;

  const colors = {
    image: '#561791',
    audio: '#DB2C80',
    text: '#3B90C5',
  };

  const pickImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
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
    } catch (e) {
      console.log(e);
    }

    setText('');
    setSendingText(false);
    setTypingText(false);
  };

  const sendImage = async (image) => {
    setSendingImage(true);

    const data = new FormData();

    data.append('photo', {
      name: uuid(),
      type: pickImage.type,
      uri: image.uri.replace('file://', ''),
    });

    try {
      await api.post('v1/yepboards', {
        mission: mission._id,
        user: user.id,
        type: 'image',
        file: data,
      });
    } catch (e) {
      console.log(e);
    }

    setSendingImage(false);
  };

  const sendAudio = () => {};

  const fadeInAndOutAnimation = Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 0.6,
      duration: 750,
    }),
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 750,
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
          }),
        ]),
      ).start();
    }
  }, [recordingAudio]);

  return (
    <Container height={typingText ? 200 : 60}>
      <Actions>
        {typingText ||
          (recordingAudio && (
            <Button
              color="#00000055"
              onPress={() => {
                setTypingText(false);
                setRecordingAudio(false);
              }}>
              <ButtonImage resizeMode="contain" source={cancelIcon} />
            </Button>
          ))}
        {!typingText && !recordingAudio && (
          <Button
            disabled={sendingImage || recordingAudio}
            color={colors.image}
            onPress={pickImage}>
            <ButtonImage resizeMode="contain" source={imageIcon} />
          </Button>
        )}
        {!typingText && (
          <Button
            disabled={sendingImage}
            color={colors.audio}
            onPress={() =>
              recordingAudio ? sendAudio() : setRecordingAudio(true)
            }>
            <ButtonImage
              resizeMode="contain"
              source={recordingAudio ? sendIcon : microphoneIcon}
            />
          </Button>
        )}
        {!recordingAudio && (
          <Button
            disabled={sendingImage || recordingAudio || sendingText}
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
            {recordingAudio && 'Gravando áudio...'}
            {!sendingImage && !recordingAudio && 'Crie uma nota...'}
          </Placeholder>
        ) : (
          <TextInput
            multiline
            placeholder="Digite o texto de sua nota..."
            value={text}
            onChangeText={setText}
          />
        )}
        {(sendingImage || sendingText) && (
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

export default NoteCreator;
