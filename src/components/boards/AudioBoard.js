import React, {useState, useEffect} from 'react';
import moment from 'moment';
import styled from 'styled-components/native';
import {Audio} from 'expo-av';

import playIcon from '../../../assets/play.png';
import pauseIcon from '../../../assets/pause.png';
import replayIcon from '../../../assets/replay.png';

const AudioBoard = ({url, date}) => {
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
      <PlayIcon
        resizeMode="contain"
        source={!isPlaying ? (!isFinished ? playIcon : replayIcon) : pauseIcon}
      />
      <Footer>
        <FooterText>
          {`${date.type === 'creation' ? 'criado' : 'atualizado'} em ${moment(
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
  padding: 16px;
  position: absolute;
  bottom: 0;
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

export default AudioBoard;
