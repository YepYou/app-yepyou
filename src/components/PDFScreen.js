import React, {useState} from 'react';
import styled from 'styled-components/native';
import PDFReader from 'rn-pdf-reader-js';

import backButtonIcon from '../../assets/backButtom.png';

const PDFScreen = ({visible, onClose}) => {
  const testUrl = 'http://www.africau.edu/images/default/sample.pdf';

  return (
    <Modal visible={visible} transparent>
      <Container>
        <BackButton>
          <BackButtonIcon source={backButtonIcon} />
        </BackButton>
        <PDF source={{uri: testUrl}} />
      </Container>
    </Modal>
  );
};

const Modal = styled.Modal`
  flex: 1;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const BackButton = styled.TouchableOpacity`
  left: 20px;
  top: 20px;
  z-index: 999;
`;

const BackButtonIcon = styled.Image`
  width: 30px;
  height: 20px;
`;

const PDF = styled(PDFReader)`
  flex: 1;
  margin-top: 32px;
  width: 100%;
  height: 100%;
`;

export default PDFScreen;
