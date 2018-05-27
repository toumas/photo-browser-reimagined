import React from 'react';
import PropTypes from 'prop-types';
import Retry from './Retry';
import { photoShapeOptional } from '../shapes';

const Photo = ({ failed, isLoading, photo, retry }) => {
  if (isLoading) {
    return 'Loading...';
  } else if (failed) {
    return <Retry text="Failed to load photo" handleClick={retry} />;
  }
  return <img src={photo.url} alt={photo.title} />;
};

Photo.propTypes = {
  failed: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  photo: PropTypes.shape(photoShapeOptional).isRequired,
  retry: PropTypes.func.isRequired,
};

export default Photo;
