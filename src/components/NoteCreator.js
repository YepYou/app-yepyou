import React from 'react';
import styled from 'styled-components/native';

import image from '../../assets/image.png';
import microphone from '../../assets/microphone.png';
import text from '../../assets/text.png';

const NoteCreator = () => {
	return (
		<Container>
			<Actions>
				<Button color="#561791">
					<ButtonImage
						resizeMode="contain"
						source={image}
					/>
				</Button>
				<Button color="#DB2C80">
					<ButtonImage
						resizeMode="contain"
						source={microphone}
					/>
				</Button>
				<Button color="#3B90C5">
					<ButtonImage
						resizeMode="contain"
						source={text}
					/>
				</Button>
			</Actions>
			<Placeholder>
				Crie uma nota...
			</Placeholder>
		</Container>
	);
};

const Container = styled.View`
	width: 100%;
	height: 60px;
	border-radius: 30px;
	background-color: #DBDBDB;
	box-shadow: 2px 2px 3px rgba(0,0,0,0.2);
	flex-direction: row;
	padding: 0 16px;
	align-items: center;
`;

const Actions = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
`;

const Button = styled.TouchableOpacity`
	width: 40px;
	height: 40px;
	background-color: ${({ color }) => color};
	border-radius: 20px;
	margin-right: 10px;
	align-items: center;
	justify-content: center;
`;

const ButtonImage = styled.Image`
	width: 20px;
	height: 20px;
`;

const Placeholder = styled.Text`
	flex: 1;
	color: #919190;
`;

export default NoteCreator;