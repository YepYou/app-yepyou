import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import Balloon from 'react-native-balloon';

import imageCharacter from '../../../assets/personagem2.png';
import {PDFScreen} from '../../components';

const Dialogue = ({text, url}) => {
  const [showFile, setShowFile] = useState(false);

  return (
    <>
      <Container>
        <CharacterImage resizeMode="contain" source={imageCharacter} />
        <Content>
          <Balloon
            borderColor="#D9D9D9"
            backgroundColor="#D9D9D9"
            triangleDirection="left"
            borderRadius={20}
            triangleSize={10}
            width={Dimensions.get('window').width / 2}>
            <Text>{text}</Text>
          </Balloon>
          {url && (
            <UrlButton onPress={() => setShowFile(true)}>
              <UrlButtonText>Clique aqui</UrlButtonText>
            </UrlButton>
          )}
        </Content>
      </Container>
      {url && (
        <PDFScreen
          visible={showFile}
          url={url}
          onBackPress={() => setShowFile(false)}
        />
      )}
    </>
  );
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  margin: 8px 0;
`;

const Content = styled.View`
  flex: 1;
`;

const CharacterImage = styled.Image`
  width: 120px;
  height: 120px;
`;

const Text = styled.Text`
  color: #706f6f;
  font-weight: bold;
`;

const UrlButton = styled.TouchableOpacity`
  background-color: #ea2580;
  border-radius: 15px;
  width: 130px;
  height: 30px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;

const UrlButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export default Dialogue;
