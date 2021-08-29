import React, {useState, useEffect} from 'react';
import moment from 'moment';
import styled from 'styled-components/native';
import {Audio} from 'expo-av';

import playIcon from '../../../assets/play.png';
import pauseIcon from '../../../assets/pause.png';
import replayIcon from '../../../assets/replay.png';
import trashIcon from '../../../assets/trash.png';

const AudioBoard = ({url, date, onDelete}) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });

    createSound();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const createSound = async () => {
    const {sound} = await Audio.Sound.createAsync({uri: url});
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    setSound(sound);
  };

  const playSound = async () => {
    setIsFinished(false);
    isPaused && (await sound.setPositionAsync(time.resumeIn));

    await sound.playAsync();
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseSound = async () => {
    await sound.pauseAsync();

    setTime({
      ...time,
      resumeIn: time.positionMillis,
    });
    setIsPlaying(false);
    setIsPaused(true);
  };

  const replaySound = async () => {
    await sound.setPositionAsync(0);

    await sound.playAsync();
    setIsPlaying(true);
    setIsFinished(false);
  };

  const onPlaybackStatusUpdate = async ({
    durationMillis,
    positionMillis,
    didJustFinish,
  }) => {
    !isFinished && setTime({positionMillis, durationMillis});

    if (didJustFinish) {
      setIsFinished(true);
      setIsPlaying(false);
    }
  };

  return (
    <Container
      onPress={
        !isPlaying ? (!isFinished ? playSound : replaySound) : pauseSound
      }>
      <DeleteButton onPress={onDelete}>
        <TrashIcon source={trashIcon} />
      </DeleteButton>
      <PlayIcon
        resizeMode="contain"
        source={!isPlaying ? (!isFinished ? playIcon : replayIcon) : pauseIcon}
      />
      <Footer>
        <FooterText>
          {`${date.type === 'creation' ? 'criado' : 'atualizado'} em\n${moment(
            date.date,
          ).format('DD/MM/YY')}`}
        </FooterText>
      </Footer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex: 1.3;
  height: 180px;
  background-color: #3b90c5;
  border-radius: 21px;
  margin: 4px;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.View`
  flex: 1;
  position: absolute;
  bottom: 16px;
  left: 16px;
`;

const FooterText = styled.Text`
  color: #fff;
  font-size: 11px;
  font-style: italic;
`;

const PlayIcon = styled.Image`
  width: 45px;
  height: 45px;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  right: 6px;
  top: 6px;
  padding: 2px;
  border-radius: 33px;
  z-index: 999;
`;

const TrashIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export default AudioBoard;
