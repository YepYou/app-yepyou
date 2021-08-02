import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import imageIcon from '../../assets/image.png';
import microphoneIcon from '../../assets/microphone.png';
import textIcon from '../../assets/text.png';
import cancelIcon from '../../assets/cancel.png';
import sendIcon from '../../assets/send.png';

const NoteCreator = () => {
	const [image, setImage] = useState(null);
	const [sendingImage, setSendingImage] = useState(false);
	const [typingText, setTypingText] = useState(true);
	const [text, setText] = useState('');

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
			setImage(pickedImage.uri);
		}
	};

	const sendText = () => {

	}

	return (
		<Container height={typingText ? 200 : 60}>
			<Actions>
				{typingText && (
					<Button
						color="#00000055"
						onPress={() => setTypingText(false)}
					>
						<ButtonImage
							resizeMode="contain"
							source={cancelIcon}
						/>
					</Button>
				)}
				{!typingText && (
					<Button
						disabled={sendingImage}
						color={colors.image}
						onPress={(sendingImage && pickImage) || null}>
						<ButtonImage
							resizeMode="contain"
							source={imageIcon}
						/>
					</Button>
				)}
				{!typingText && (
					<Button
						disabled={sendingImage}
						color={colors.audio}>
						<ButtonImage
							resizeMode="contain"
							source={microphoneIcon}
						/>
					</Button>
				)}
				<Button
					disabled={sendingImage}
					color={colors.text}
					onPress={() => typingText ? sendText() : setTypingText(true)}>
					<ButtonImage
						resizeMode="contain"
						source={typingText ? sendIcon : textIcon}
					/>
				</Button>
			</Actions>
			<Content flex={typingText ? 2 : 1}>
				{!typingText ? (
					<Placeholder>
						{sendingImage && "Enviando imagem..."}
						{!sendingImage && "Crie uma nota..."}
					</Placeholder>
				) : (
					<TextInput
						multiline
						placeholder="Digite o texto de sua nota..."
						value={text}
						onChangeText={setText}
					/>
				)}
				{sendingImage && <ActivityIndicator color={colors.image} />}
			</Content>
		</Container>
	);
};

const Container = styled.View`
	width: 100%;
	height: 60px;
	border-radius: 30px;
	background-color: #DBDBDB;
	box-shadow: 2px 2px 3px rgba(0,0,0,0.2);
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
	opacity: ${({disabled}) => disabled ? .5 : 1}
`;

const ButtonImage = styled.Image`
	width: 20px;
	height: 20px;
`;

const Placeholder = styled.Text`
	color: #919190;
`;

const TextInput = styled.TextInput`
`;

export default NoteCreator;