import React, {useContext, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import Balloon from 'react-native-balloon';

import Header from '../components/Header';
import imageCharacter from '../../assets/peronsagem1.png';
import plusIcon from '../../assets/plus.png';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import {Loading} from '../components';

const YepBoards = () => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    getYepBoardMissions();
  }, []);

  const getYepBoardMissions = async () => {
    try {
      const {data: missions} = await api.get(`/v1/yepboards?user=${user.id}`);
      setMissions(missions.docs);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const renderYepBoardMissions = () => {
    return missions.map((mission) => (
      <YepBoard
        onPress={() => navigation.navigate('MissionYepBoard', {mission})}>
        <YepBoardName>{mission.name}</YepBoardName>
        <Plus>
          <PlusIcon resizeMode="contain" source={plusIcon} />
        </Plus>
      </YepBoard>
    ));
  };

  return (
    <>
      <Header goBack itle="YepBoard" />
      <Dialogue>
        <Balloon
          borderColor="#C3C3C3"
          backgroundColor="#C3C3C3"
          triangleDirection="right"
          borderRadius={20}
          triangleSize={10}
          width={Dimensions.get('window').width * 0.6}>
          <DialogueText>
            Que tal conferir as anotações feitas em seu YepBoard?
          </DialogueText>
        </Balloon>
        <CharacterImage resizeMode="contain" source={imageCharacter} />
      </Dialogue>
      <Container>{loading ? <Loading /> : renderYepBoardMissions()}</Container>
    </>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding: 0 16px;
  margin-top: 86px;
`;

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

const YepBoard = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: #dfdfdf;
  border-radius: 7px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 12px;
  justify-content: space-between;
`;

const YepBoardName = styled.Text`
  color: #706f6f;
  font-weight: bold;
  font-size: 25px;
`;

const Plus = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #706f6f;
  align-items: center;
  justify-content: center;
`;

const PlusIcon = styled.Image`
  width: 25px;
  height: 25px;
`;

export default YepBoards;
