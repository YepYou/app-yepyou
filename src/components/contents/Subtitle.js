import React from 'react';
import styled from 'styled-components/native';

const Subtitle = ({text}) => {
	return (
		<Container>
			<Text>{text}</Text>
		</Container>
	);
}

const Container = styled.View`
	width: 100%;
	margin: 8px 0;
`;

const Text = styled.Text`
	color: #560BA0;
	font-weight: bold;
	font-size: 18px;
`;

export default Subtitle;