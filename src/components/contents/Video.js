import React from 'react';
import styled from 'styled-components';
import YoutubeIframe from 'react-native-youtube-iframe';

const Video = ({url}) => {
	return (
		<Container>
			<YoutubeIframe
				height={300}
				videoId={url.split('v=')[1]}
			/>
		</Container>
	);
}

const Container = styled.View`
	width: 100%;
	height: 300px;
	margin: 8px 0;
`;

export default Video;