import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, FlatList} from 'react-native';
import styled from 'styled-components/native';
import Balloon from 'react-native-balloon';
import AuthContext from '../context/AuthContext';

import {Header, Loading, NoteCreator} from '../components';
import imageCharacter from '../../assets/peronsagem1.png';
import api from '../services/api';
import MissionContext from '../context/MissionContext';
import config from '../config';
import {TextBoard} from '../components/boards';

const MissionYepboard = ({route}) => {
  const {user} = useContext(AuthContext);
  const {mission} = route.params.mission
    ? route.params
    : useContext(MissionContext);

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

      setBoards(boards.docs);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const renderBoard = (board) => {
    switch (board.type) {
      case config.boardTypes.text:
        return (
          <TextBoard
            id={board._id}
            mission={board.mission}
            size={2}
            text={board.content}
            date={{
              type: board.updatedAt === board.createdAt ? 'creation' : 'update',
              date: board.updatedAt,
            }}
            onUpdateText={getYepBoard}
          />
        );
      default:
        return null;
    }
  };

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
        {loading ? (
          <Loading />
        ) : (
          <Boards>
            <FlatList
              data={boards}
              renderItem={({item}) => renderBoard(item)}
              keyExtractor={(item) => item._id}
              numColumns={2}
            />
          </Boards>
        )}
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

const Boards = styled.View`
  flex: 1;
  margin-top: 16px;
`;

export default MissionYepboard;
