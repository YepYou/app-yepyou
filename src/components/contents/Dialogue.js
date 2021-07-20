import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Balloon from "react-native-balloon";

import imageCharacter from '../../../assets/personagem2.png';

const Dialogue = ({text}) => {
	return (
		<Container>
			<CharacterImage
				resizeMode="contain"
				source={imageCharacter}
			/>
			<Balloon
				borderColor="#D9D9D9"
				backgroundColor="#D9D9D9"
				triangleDirection="left"
				borderRadius={20}
				triangleSize={10}
				width={Dimensions.get('window').width / 2}>
					<Text>{text}</Text>
			</Balloon>
		</Container>
	);
}

const Container = styled.View`
	width: 100%;
	flex-direction: row;
	margin: 8px 0;
`;

const CharacterImage = styled.Image`
	width: 120px;
	height: 120px;
`;

const Text = styled.Text`
	color: #706F6F;
	font-weight: bold;
`;

export default Dialogue;