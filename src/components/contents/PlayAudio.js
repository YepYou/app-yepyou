import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Audio } from 'expo-av';

import playIcon from '../../../assets/play.png';
import pauseIcon from '../../../assets/pause.png';
import replayIcon from '../../../assets/replay.png';

const PlayAudio = ({url}) => {
	const [sound, setSound] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [time, setTime] = useState(null);
	const [barWidth, setBarWidth] = useState(0);

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
		const { sound } = await Audio.Sound.createAsync({uri: url});
		sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

		setSound(sound);
	}

	const playSound = async () => {
		setIsFinished(false);
		isPaused && await sound.setPositionAsync(time.resumeIn);
	
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
	}

	const onPlaybackStatusUpdate = async ({durationMillis, positionMillis, didJustFinish}) => {
		!isFinished && setTime({positionMillis, durationMillis});

		if (didJustFinish) {
			setIsFinished(true);
			setIsPlaying(false);
		}
	}
	const positionPercent = () => time ? Math.round((time.positionMillis * 100) / time.durationMillis) : 0;

	return (
		<Container>
			<Bar onLayout={({nativeEvent}) => setBarWidth(nativeEvent.layout.width)}>
				<ProgressBar width={positionPercent()} />
				<Pointer position={positionPercent()} barWidth={barWidth} />
			</Bar>
			<Button onPress={!isPlaying ? !isFinished ? playSound : replaySound : pauseSound}>
				<PlayIcon
					resizeMode="contain"
					source={!isPlaying ? !isFinished ? playIcon : replayIcon : pauseIcon}
				/>
			</Button>
		</Container>
	);
};

const Container = styled.View`
	width: 100%;
	height: 62px;
	margin: 8px 0;
	background-color: #560BA0;
	border-radius: 32px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	padding: 0 16px;
`;

const Bar = styled.View`
	width: 100%;
	height: 10px;
	background-color: #EA258055;
	border-radius: 5px;
	flex: 5;
`;

const Pointer = styled.View`
	width: 20px;
	height: 20px;
	background-color: #FFF;
	border-radius: 10px;
	position: absolute;
	bottom: -5px;
	left: ${({position, barWidth}) => `${((position / 100) * barWidth) - 8}px`};
`;

const ProgressBar = styled.View`
	width: ${({width}) => `${width}%`};
	padding-right: 2px;
	height: 10px;
	background-color: #EA2580;
	border-bottom-left-radius: 5px;
	border-top-left-radius: 5px;
`;

const Button = styled.TouchableOpacity`
	flex: 1;
	align-items: flex-end;
`;

const PlayIcon = styled.Image`
	width: 30px;
	height: 30px;
`;

export default PlayAudio;