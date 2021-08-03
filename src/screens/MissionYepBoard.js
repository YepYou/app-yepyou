import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Balloon from "react-native-balloon";

import { Header, NoteCreator } from '../components';
import imageCharacter from '../../assets/peronsagem1.png';

const MissionYepboard = () => {
	return (
		<>
			<Header goBack title="YepBoard" />
			<Dialogue>
				<Balloon
					borderColor="#C3C3C3"
					backgroundColor="#C3C3C3"
					triangleDirection="right"
					borderRadius={20}
					triangleSize={10}
					width={Dimensions.get('window').width * .6}>
						<DialogueText>
							Hora de fazer todas as anotações, não esqueça de nada!
						</DialogueText>
				</Balloon>
				<CharacterImage
					resizeMode="contain"
					source={imageCharacter}
				/>
			</Dialogue>
			<Container>
				<NoteCreator />
			</Container>
		</>
	)
};

const Dialogue = styled.View`
	width: 100%;
	flex-direction: row;
	position: absolute;
	top: 70px;
	right: 0;
	align-items: center;
	justify-content: flex-end;
`;

const DialogueText = styled.Text`
	color: #706F6F;
	font-weight: bold;
`;

const CharacterImage = styled.Image`
	width: 120px;
	height: 120px;
`;

const Container = styled.View`
	margin-top: 85px;
	flex: 1;
	width: 100%;
	padding: 0 16px;
`;

export default MissionYepboard;