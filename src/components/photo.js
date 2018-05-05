import React from 'react';
import PropTypes from 'prop-types';
import { photoShapeOptional } from '../shapes';

const Photo = ({ failed, isLoading, photo, retry }) => {
  if (isLoading) {
    return 'Loading...';
  } else if (failed) {
    return (
      <React.Fragment>
        <span>Failed to load photo</span>
        <button onClick={retry}>Retry</button>
      </React.Fragment>
    );
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
