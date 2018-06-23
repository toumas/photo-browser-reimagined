import React from 'react';
import PropTypes from 'prop-types';
import AlbumsContainer from '../../components/Albums/Container';
import PhotoList from '../../components/UI/PhotoList';
import { matchShape } from '../../shapes';

const ScreensAlbums = ({ match }) => (
  <AlbumsContainer match={match}>
    {props => (
      <PhotoList {...props}>{photo => <span>{photo.title}</span>}</PhotoList>
    )}
  </AlbumsContainer>
);

ScreensAlbums.propTypes = {
  match: PropTypes.shape(matchShape).isRequired,
};

export default ScreensAlbums;
