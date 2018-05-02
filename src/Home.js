import React from 'react';
import PropTypes from 'prop-types';
import PhotosContainer from './PhotosContainer';
import PhotoList from './PhotoList';
import { matchShape } from './shapes';

const Home = ({ match: { params } }) => (
  <PhotosContainer params={params}>
    {props => <PhotoList {...props} />}
  </PhotosContainer>
);

Home.propTypes = {
  match: PropTypes.shape(matchShape).isRequired,
};

export default Home;
