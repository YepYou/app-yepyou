import React, {useContext, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import Balloon from 'react-native-balloon';
import AuthContext from '../context/AuthContext';

import {Header, Loading, NoteCreator} from '../components';
import imageCharacter from '../../assets/peronsagem1.png';
import api from '../services/api';
import MissionContext from '../context/MissionContext';

const MissionYepboard = () => {
  const {user} = useContext(AuthContext);
  const {mission} = useContext(MissionContext);

  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getYepBoard();
  }, []);

  const getYepBoard = async () => {
    try {
      const {data: boards} = await api.get(
        `/v1/yepboards?user=${user.id}&mission=${mission._id}`,
      );

      setYepBoard(boards.docs);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const renderBoards = () => {};

  return (
    <>
      <Header goBack title="YepBoard" />
      <Dialogue>
        <Balloon
          borderColor="#C3C3C3"
          backgroundColor="#C3C3C3"
          triangleDirection="right"
          borderRadius={20}
          triangleSize={10}
          width={Dimensions.get('window').width * 0.6}>
          <DialogueText>
            Hora de fazer todas as anotações, não esqueça de nada!
          </DialogueText>
        </Balloon>
        <CharacterImage resizeMode="contain" source={imageCharacter} />
      </Dialogue>
      <Container>
        <NoteCreator mission={mission} />
        {loading ? <Loading /> : renderBoards()}
      </Container>
    </>
  );
};

const Dialogue = styled.View`
  width: 100%;
  flex-direction: row;
  position: absolute;
  top: 70px;
  right: 0;
  align-items: center;
  justify-content: flex-end;
`;

const DialogueText = styled.Text`
  color: #706f6f;
  font-weight: bold;
`;

const CharacterImage = styled.Image`
  width: 120px;
  height: 120px;
`;

const Container = styled.View`
  margin-top: 85px;
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export default MissionYepboard;
