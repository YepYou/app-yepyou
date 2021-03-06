import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {Modal, Keyboard} from 'react-native';
import {Button, Spinner} from '@ui-kitten/components';

import api from '../../services/api';
import AuthContext from '../../context/AuthContext';
import trashIcon from '../../../assets/trash.png';

const TextBoard = ({id, mission, text, date, onUpdateText, onDelete}) => {
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
      <Container onPress={() => setShowFullText(true)}>
        <DeleteButton onPress={onDelete}>
          <TrashIcon source={trashIcon} />
        </DeleteButton>
        <Text numberOfLines={8}>{text}</Text>
        <Footer>
          <FooterText>
            {`${date.type === 'creation' ? 'criado' : 'atualizado'} em ${moment(
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
                Salvar edi????o
              </Button>
            </Actions>
          </FullText>
        </ModalOverlay>
      </Modal>
    </>
  );
};

const Container = styled.TouchableOpacity`
  flex: 2;
  height: 180px;
  background-color: #560b93;
  border-radius: 21px;
  padding: 16px 28px 16px 16px;
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
  font-size: 11px;
  font-style: italic;
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

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  right: 6px;
  top: 6px;
  padding: 2px;
  background-color: #560b93;
  border-radius: 33px;
  z-index: 999;
`;

const TrashIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export default TextBoard;
