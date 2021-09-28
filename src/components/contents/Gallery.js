import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import {ActivityIndicator} from 'react-native';

import api from '../../services/api';

const Gallery = ({content}) => {
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const {data: dataImages} = await api.get(`/v1/contents/${content._id}`);
      setGallery(dataImages.gallery);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const renderImages = () => {
    return gallery.map((image) => (
      <Image resizeMode="cover" source={{uri: `${image.url}`}} />
    ));
  };

  return (
    <Container>
      {!loading ? (
        <Swiper activeDotColor="#DB2C80" dotColor="#DB2C8040">
          {renderImages()}
        </Swiper>
      ) : (
        <ActivityIndicator color="#DB2C80" size="large" />
      )}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
  background-color: #00000011;
  border-radius: 32px;
  margin-bottom: 16px;
`;

const Image = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 32px;
`;

export default Gallery;
