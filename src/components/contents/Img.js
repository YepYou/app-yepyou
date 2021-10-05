import React, {useState, useEffect} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';

const Img = ({url}) => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    getSize();
  }, [url]);

  const Container = styled.TouchableOpacity`
    width: 100%;
    margin: 8px 0;
    align-items: center;
  `;

  const Image = styled.Image`
    width: ${!isPortrait ? '100%' : '70%'};
    height: ${!isPortrait ? '200px' : '300px'};
    border-radius: 32px;
  `;

  const Overlay = styled.TouchableOpacity`
    background-color: #000000dd;
  `;

  const ImageFullscreen = styled.Image`
    width: 100%;
    height: 100%;
  `;

  const getSize = () => Image.getSize(url, (w, h) => setIsPortrait(h > w));

  return (
    <>
      <Container onPress={() => setFullscreen(true)}>
        <Image resizeMode="cover" source={{uri: url}} />
      </Container>
      <Modal visible={fullscreen} transparent={true}>
        <Overlay onPress={() => setFullscreen(false)}>
          <ImageFullscreen resizeMode="contain" source={{uri: url}} />
        </Overlay>
      </Modal>
    </>
  );
};

export default Img;
