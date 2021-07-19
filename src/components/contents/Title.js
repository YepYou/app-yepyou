import React from 'react';
import styled from 'styled-components/native';

const Title = ({text}) => {
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
	font-size: 30px;
	color: #000;
	font-weight: bold;
	text-align: left;
`;

export default Title;