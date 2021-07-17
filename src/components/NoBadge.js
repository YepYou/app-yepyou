import React from 'react';
import styled from 'styled-components/native';

const NoBadge = () => {
	return (
		<Container>
			<Circle />
		</Container>
	);
}

const Container = styled.View`
	width: 60px;
	height: 60px;
	position: absolute;
	top: -20px;
	left: -8px;
`;

const Circle = styled.View`
	width: 100%;
	height: 100%;
	border: 5px solid grey;
	border-radius: 30px;
	background-color: #CDCDCD;
`;

export default NoBadge;