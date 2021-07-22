import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

import imagePointer from '../../assets/pointer.png';

const StageProgress = ({progress = 100}) => {
	return (
		<Container>
			<Bar progress={progress} />
			<ProgressBox progress={progress}>
				<Progress>{progress}%</Progress>
				<Pointer resizeMode="contain" source={imagePointer}></Pointer>
			</ProgressBox>
		</Container>
	);
};

const Container = styled.View`
	width: ${Dimensions.get('window').width * 0.65};
	height: 30px;
	align-self: flex-end;
	margin-right: 16px;
	border: 1px solid #EA2580;
	border-radius: 15px;
	padding: 6px;
`;

const Bar = styled.View`
	width: ${({progress}) => `${progress}%`};
	height: 100%;
	background-color: #EA2580;
	border-radius: 15px;
	justify-content: center;
`;

const ProgressBox = styled.View`
	flex-direction: row;
	position: absolute;
	bottom: -15px;
	width: 100%;
	left: ${({progress}) => `${(Dimensions.get('window').width * 0.65) * (progress / 100) - 59}px`};
	align-items: center;
`;

const Progress = styled.Text`
	color: #FFF;
	font-size: 12px;
	font-weight: bold;
`;

const Pointer = styled.Image`
	width: 55px;
	height: 55px;
`;

export default StageProgress;