import React from 'react';
import PropTypes from 'prop-types';
import PhotoContainer from '../../components/Photo/Container';
import Photo from '../../components/Photo/Photo';
import { matchShape } from '../../shapes';

const ScreensPhoto = ({ match }) => (
  <PhotoContainer match={match}>{props => <Photo {...props} />}</PhotoContainer>
);

ScreensPhoto.propTypes = {
  match: PropTypes.shape(matchShape).isRequired,
};

export default ScreensPhoto;
