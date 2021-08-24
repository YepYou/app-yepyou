import React, {useState} from 'react';
import {Modal} from 'react-native';
import moment from 'moment';
import styled from 'styled-components/native';

import trashIcon from '../../../assets/trash.png';

const ImageBoard = ({url, date, onDelete}) => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <Container onPress={() => setFullscreen(true)}>
        <DeleteButton onPress={onDelete}>
          <TrashIcon source={trashIcon} />
        </DeleteButton>
        <Image
          resizeMode="cover"
          source={{
            uri: url,
          }}
        />
        <Footer>
          <FooterText>
            {`${date.type === 'creation' ? 'criado' : 'atualizado'} em ${moment(
              date.date,
            ).format('DD/MM/YY')}`}
          </FooterText>
        </Footer>
      </Container>
      <Modal visible={fullscreen} transparent={true}>
        <Overlay onPress={() => setFullscreen(false)}>
          <ImageFullscreen resizeMode="contain" source={{uri: url}} />
        </Overlay>
      </Modal>
    </>
  );
};

const Container = styled.TouchableOpacity`
  flex: 1.35;
  height: 180px;
  border-radius: 21px;
  margin: 4px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 21px;
`;

const ImageFullscreen = styled.Image`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.TouchableOpacity`
  background-color: #000000dd;
`;

const Footer = styled.View`
  flex: 1;
  padding: 16px;
  position: absolute;
  bottom: 0;
`;

const FooterText = styled.Text`
  color: #fff;
  font-size: 11px;
  font-style: italic;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  right: 6px;
  top: 6px;
  padding: 2px;
  border-radius: 33px;
  z-index: 999;
`;

const TrashIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export default ImageBoard;
