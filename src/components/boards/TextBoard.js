import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {Modal, Keyboard} from 'react-native';
import {Button, Spinner} from '@ui-kitten/components';

import api from '../../services/api';
import AuthContext from '../../context/AuthContext';

const TextBoard = ({id, mission, size, text, date, onUpdateText}) => {
  const {user} = useContext(AuthContext);

  const [showFullText, setShowFullText] = useState(false);
  const [newText, setNewText] = useState(text);
  const [savingTextEdition, setSavingTextEdition] = useState(false);

  const saveTextEdition = async () => {
    setSavingTextEdition(true);

    try {
      await api.put(`/v1/yepboards/${id}`, {
        mission,
        user: user.id,
        type: 'text',
        content: newText,
      });
    } catch (e) {
      console.log(e);
    }

    setSavingTextEdition(false);
    setShowFullText(false);
    onUpdateText();
  };

  const LoadingIndicator = (props) => (
    <LoadingIndicatorContainer style={props.style}>
      <Spinner size="small" />
    </LoadingIndicatorContainer>
  );

  return (
    <>
      <Container size={size} onPress={() => setShowFullText(true)}>
        <Text numberOfLines={5}>{text}</Text>
        <Footer>
          <FooterText>
            {`${date.type === 'creation' ? 'Criado' : 'Atualizado'} em ${moment(
              date.date,
            ).format('DD/MM/YY')}`}
          </FooterText>
        </Footer>
      </Container>
      <Modal transparent visible={showFullText}>
        <ModalOverlay>
          <FullText>
            <TextInput
              multiline
              textAlignVertical="top"
              onScroll={() => Keyboard.dismiss()}
              onChangeText={(value) => setNewText(value)}>
              {newText}
            </TextInput>
            <Actions>
              <Button
                status="control"
                appearance="ghost"
                onPress={() => {
                  setShowFullText(false);
                  setNewText(text);
                  setSavingTextEdition(false);
                }}>
                Fechar
              </Button>
              <Button
                disabled={text === newText || savingTextEdition}
                status="success"
                accessoryLeft={savingTextEdition ? LoadingIndicator : null}
                onPress={saveTextEdition}>
                Salvar edição
              </Button>
            </Actions>
          </FullText>
        </ModalOverlay>
      </Modal>
    </>
  );
};

const Container = styled.TouchableOpacity`
  flex: ${({size}) => size};
  height: 150px;
  background-color: #560b93;
  border-radius: 21px;
  padding: 16px;
  margin: 4px;
`;

const Text = styled.Text`
  color: #fff;
  flex: 4;
`;

const Footer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const FooterText = styled.Text`
  color: #fff;
  font-size: 12px;
`;

const ModalOverlay = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #560b9333;
`;

const FullText = styled.View`
  background-color: #560b93;
  width: 90%;
  height: 85%;
  border-radius: 33px;
`;

const ScrollText = styled.ScrollView`
  flex: 5;
  padding: 0 16px;
  margin: 32px 0 16px 0;
`;

const Actions = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10%;
  align-items: center;
`;

const TextInput = styled.TextInput`
  flex: 5;
  color: #fff;
  width: 100%;
  padding: 32px 16px;
`;

const LoadingIndicatorContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export default TextBoard;
