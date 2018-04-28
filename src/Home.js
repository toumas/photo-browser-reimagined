import React from 'react';
import PhotosContainer from './PhotosContainer';
import PhotoList from './PhotoList';

const Home = () => (
  <PhotosContainer>{props => <PhotoList {...props} />}</PhotosContainer>
);

export default Home;
