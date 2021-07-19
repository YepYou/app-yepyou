import React from 'react';
import styled from 'styled-components';

import imageCogs from '../../assets/lupa.png';

const StageTitle = ({text}) => {
	return (
		<Container>
			<Text>{text}</Text>
			<ImageCogs resizeMode="contain" source={imageCogs} />
		</Container>
	);
};

const Container = styled.View`
	background: #EA2580;
	padding: 0px 32px;
	border-radius: 16px;
	align-items: center;
	justify-content: center;
	margin: 32px 0 8px 0;
	align-self: flex-start;
`;

const Text = styled.Text`
	color: #FFF;
	font-weight: bold;
	font-size: 28px;
`;

const ImageCogs = styled.Image`
	width: 60px;
	height: 60px;
	position: absolute;
	right: -20px;
	top: -25px;
`;

export default StageTitle;